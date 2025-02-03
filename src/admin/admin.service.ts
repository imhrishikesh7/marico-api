import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Between, In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CryptoService, Utility } from '../lib/utility';
import { JwtService } from '@nestjs/jwt';
import { AdminActivity } from './entities/admin_activity.entity';
import permissions, { Permission } from '../lib/permissions';
import menu, { MenuItem } from '../lib/menu';
import * as AWS from 'aws-sdk';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(AdminActivity)
    private adminActivityRepository: Repository<AdminActivity>,
  ) {}

  //login
  async login(email: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { email: email },
      relations: ['role'],
    });
    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }
    if (!CryptoService.comparePassword(password, admin.password)) {
      throw new BadRequestException('Invalid email or password');
    }
    if (!admin.is_active) {
      throw new BadRequestException('Your account is inactive');
    }

    if (!admin.role.is_active) {
      throw new BadRequestException('Your role is inactive');
    }

    await this.addAdminActivity(admin, 'Login', 'login', `${admin.id}`);

    return admin;
  }

  //generate token
  async generateToken(admin: Admin): Promise<string> {
    const payload = { unique_id: admin.unique_id, id: admin.id };
    return this.jwtService.sign(payload);
  }

  //get admin from token
  async getAdminFromToken(token: string): Promise<Admin | null> {
    try {
      const payload = this.jwtService.verify(token);
      return await this.getAdminByUniqueIdAndId(payload.unique_id, payload.id);
    } catch (e) {
      return e;
    }
  }

  //get admin by unique_id and id
  async getAdminByUniqueIdAndId(unique_id: string, id: number): Promise<Admin | null> {
    return await this.adminRepository.findOne({
      where: { unique_id: unique_id, id: id },
      relations: ['role'],
    });
  }

  //new admin
  async newAdmin(
    loggedInAdmin: Admin,
    name: string,
    email: string,
    password: string,
    role_id: number,
    is_active: boolean,
  ): Promise<boolean> {
    const adminWithEmail = await this.adminRepository.findOne({
      where: { email: email },
    });
    if (adminWithEmail) {
      throw new BadRequestException('Email already exists');
    }
    const role = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!role) {
      throw new BadRequestException('Invalid role');
    }

    const admin = new Admin();
    admin.name = name;
    admin.email = email;
    admin.password = password;
    admin.role = role;
    admin.is_active = is_active;

    await this.adminRepository.save(admin);
    await this.addAdminActivity(
      loggedInAdmin,
      `${loggedInAdmin.name} created ${admin.name}`,
      'new_admin',
      `${admin.id}`,
      {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        is_active: admin.is_active,
      },
    );
    return true;
  }

  //update admin
  async updateAdmin(
    loggedInAdmin: Admin,
    id: number,
    name: string,
    email: string,
    role_id: number,
    is_active: boolean,
  ): Promise<boolean> {
    const admins = await this.adminRepository.find({
      select: ['id', 'name', 'email', 'role', 'is_active'],
      where: { id: id },
      relations: ['role'],
    });

    if (admins.length == 0) {
      throw new BadRequestException('Invalid admin');
    }

    const admin = admins[0];

    //if admin.email is not equal to email then check if email already exists
    if (admin.email != email) {
      const adminWithEmail = await this.adminRepository.findOne({
        where: { email: email },
      });
      if (adminWithEmail) {
        throw new BadRequestException('Email already exists');
      }
    }

    admin.name = name;
    admin.email = email;
    const role = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!role) {
      throw new BadRequestException('Invalid role');
    }

    admin.role = role;
    admin.is_active = is_active;

    await this.adminRepository.save(admin);
    await this.addAdminActivity(
      loggedInAdmin,
      `${loggedInAdmin.name} updated ${admin.name}`,
      'update_admin',
      `${admin.id}`,
      {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        is_active: admin.is_active,
      },
    );
    return true;
  }

  //update admin password
  async updateAdminPassword(loggedInAdmin: Admin, id: number, password: string): Promise<boolean> {
    const admins = await this.adminRepository.find({
      where: { id: id },
      relations: ['role'],
    });

    if (admins.length == 0) {
      throw new BadRequestException('Invalid admin');
    }

    const admin = admins[0];
    admin.password = password;
    await this.adminRepository.save(admin);
    await this.addAdminActivity(
      loggedInAdmin,
      `${loggedInAdmin.name} updated ${admin.name}'s password`,
      'update_admin_password',
      `${admin.id}`,
    );
    return true;
  }

  //get admins
  async getAdmins(): Promise<
    {
      id: number;
      name: string;
      email: string;
      role: Role;
      is_active: boolean;
    }[]
  > {
    //sort by name
    const admins = await this.adminRepository.find({
      relations: ['role'],
      order: { name: 'ASC' },
    });

    return admins.map(admin => {
      return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        is_active: admin.is_active,
      };
    });
  }

  //get admin by id
  async getAdminById(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    role: Role;
    is_active: boolean;
  } | null> {
    //sort by name
    const admins = await this.adminRepository.find({
      where: { id: id },
      relations: ['role'],
      order: { name: 'ASC' },
    });
    if (admins.length == 0) {
      return null;
    }
    const admin = admins[0];
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      is_active: admin.is_active,
    };
  }

  async getAdminsByIds(ids: number[]): Promise<
    {
      id: number;
      name: string;
    }[]
  > {
    const admins = await this.adminRepository.find({
      where: { id: In(ids) },
    });
    return admins.map(admin => {
      return {
        id: admin.id,
        name: admin.name,
      };
    });
  }

  //async get permission list
  getPermissions(): Permission[] {
    return permissions;
  }

  //add role
  async newRole(
    loggedInAdmin: Admin,
    name: string,
    rolePermissions: string[],
    landing_url: string,
    is_active: boolean,
  ): Promise<boolean> {
    const allowedPermissions = permissions;

    //check if permissions are valid
    for (const permission of rolePermissions) {
      const foundPermission = allowedPermissions.find(allowedPermission => {
        return allowedPermission.key == permission;
      });
      if (!foundPermission) {
        throw new BadRequestException(`Invalid permission ${permission}`);
      }
    }

    const role = new Role();
    role.name = name;
    role.permissions = rolePermissions;
    role.landing_url = landing_url;
    role.is_active = is_active;
    role.is_super_admin = false;
    await this.roleRepository.save(role);
    await this.addAdminActivity(
      loggedInAdmin,
      `${loggedInAdmin.name} created ${role.name}`,
      'new_role',
      `${role.id}`,
      {
        name: role.name,
        permissions: role.permissions,
        landing_url: role.landing_url,
        is_active: role.is_active,
      },
    );
    return true;
  }

  //update role
  async updateRole(
    loggedInAdmin: Admin,
    id: number,
    name: string,
    rolePermissions: string[],
    landing_url: string,
    is_active: boolean,
  ): Promise<boolean> {
    const allowedPermissions = permissions;

    //check if permissions are valid
    for (const permission of rolePermissions) {
      const foundPermission = allowedPermissions.find(allowedPermission => {
        return allowedPermission.key == permission;
      });
      if (!foundPermission) {
        throw new BadRequestException(`Invalid permission ${permission}`);
      }
    }

    const roles = await this.roleRepository.find({
      where: { id: id },
    });

    if (roles.length == 0) {
      throw new BadRequestException('Invalid role');
    }

    const role = roles[0];
    role.name = name;
    role.permissions = rolePermissions;
    role.landing_url = landing_url;
    role.is_active = is_active;
    await this.roleRepository.save(role);
    await this.addAdminActivity(
      loggedInAdmin,
      `${loggedInAdmin.name} updated ${role.name}`,
      'update_role',
      `${role.id}`,
      {
        name: role.name,
        permissions: role.permissions,
        landing_url: role.landing_url,
        is_active: role.is_active,
      },
    );
    return true;
  }

  //async get role list
  async getRoles(): Promise<Role[]> {
    //get all roles ordered by name
    return await this.roleRepository.find({
      order: { name: 'ASC' },
    });
  }

  //async get role by id or throw error
  async getRoleById(id: number): Promise<Role | null> {
    const roles = await this.roleRepository.find({
      where: { id: id },
    });
    if (roles.length == 0) {
      return null;
    }
    return roles[0];
  }

  //async get menu list for role
  async getMenuListForRole(role: Role): Promise<MenuItem[]> {
    const fullMenu: MenuItem[] = menu;
    const filteredMenu: MenuItem[] = [];
    for (const menuItem of fullMenu) {
      if (!menuItem.role) {
        filteredMenu.push(menuItem);
        continue;
      }
      if (menuItem.role.length == 0) {
        filteredMenu.push(menuItem);
        continue;
      }
      if (menuItem.role.some(item => role.permissions.includes(item)) || role.is_super_admin) {
        if (!menuItem.sub) {
          filteredMenu.push(menuItem);
          continue;
        }
        if (menuItem.sub.length == 0) {
          filteredMenu.push(menuItem);
          continue;
        }
        //check if sub menu has role
        menuItem.sub = menuItem.sub.filter(subMenuItem => {
          if (!subMenuItem.role) {
            return true;
          }
          if (subMenuItem.role.length == 0) {
            return true;
          }
          if (
            subMenuItem.role.some(item => role.permissions.includes(item)) ||
            role.is_super_admin
          ) {
            return true;
          }
          return false;
        });
        if (menuItem.sub.length > 0) {
          filteredMenu.push(menuItem);
        }
      }
    }
    return filteredMenu;
  }

  //logout
  async logout(admin: Admin): Promise<boolean> {
    await this.addAdminActivity(admin, 'Logout', 'logout', `${admin.id}`);
    return true;
  }

  //async get admin activity list, start date, end date
  async getActivities(
    startDate: Date,
    endDate: Date,
    page: number,
    limit: number,
  ): Promise<{
    adminActivities: AdminActivity[];
    total: number;
  }> {
    const skip = (page - 1) * limit;

    //set startdate to 00:00:00
    startDate.setHours(0, 0, 0, 0);

    //set enddate to 23:59:59
    endDate.setHours(23, 59, 59, 999);

    const [adminActivities, total] = await this.adminActivityRepository.findAndCount({
      where: {
        created_at: Between(startDate, endDate),
      },
      relations: ['admin'],
      order: { created_at: 'DESC' },
      skip: skip,
      take: limit,
    });

    return {
      adminActivities: adminActivities,
      total: total,
    };
  }

  //upload file to s3
  async uploadFileToS3(file: Express.Multer.File, directory: string): Promise<string> {
    const s3 = new AWS.S3({
      region: process.env.AWS_REGION,
    });
    //generate unique file name (slugify original name)
    const file_name = file.originalname.split('.');
    const filename = `${file_name[0]}.${file_name[1]}`;

    //check if extension is allowed
    const allowedExtensions = [
      'jpg',
      'jpeg',
      'png',
      'mp4',
      'pdf',
      'csv',
      'svg',
      'gif',
      'docx',
      'doc',
      'mp3',
      'mp4',
    ];
    const extension = file_name[1];
    if (extension) {
      if (!allowedExtensions.includes(extension)) {
        throw new BadRequestException('Invalid file type');
      }
    }
    let sanitizedDirectory = '';
    if (directory !== null || directory !== '') {
      sanitizedDirectory = directory.replace(/\/+$/, '');
    } else {
      sanitizedDirectory = 'images/';
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: `${sanitizedDirectory}/${filename}`,
      Body: file.buffer,
      //cache for 1 year
      CacheControl: 'max-age=31536000',
      //content type
      ContentType: file.mimetype,
    };
    await s3.upload(params).promise();
    return '/' + params.Key;
  }

  //generate thumbnail for video file using fluent-ffmpeg and upload to s3
  generateThumbnailForVideoFile(file: Express.Multer.File): Promise<string> {
    return new Promise(resolve => {
      const s3 = new AWS.S3({
        region: process.env.AWS_REGION,
      });
      //generate thumbnail
      const thumbnailFilename = `${Date.now()}-${Utility.slugify(file.originalname)}.jpg`;
      const thumbnailPath = `/tmp/${thumbnailFilename}`;
      const thumbnailUploadPath = `uploads/${thumbnailFilename}`;
      //save file to tmp
      fs.writeFileSync(`/tmp/${file.originalname}`, file.buffer);

      ffmpeg(`/tmp/${file.originalname}`)
        .on('end', async function () {
          //upload thumbnail to s3
          const thumbnailParams = {
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: thumbnailUploadPath,
            Body: fs.createReadStream(thumbnailPath),
            //cache for 1 year
            CacheControl: 'max-age=31536000',
            //content type
            ContentType: 'image/jpeg',
          };
          await s3.upload(thumbnailParams).promise();
          //delete thumbnail from tmp
          fs.unlinkSync(thumbnailPath);
          //delete video from tmp
          fs.unlinkSync(`/tmp/${file.originalname}`);
          resolve((process.env.AWS_S3_CDN || '') + '/' + thumbnailParams.Key);
        })
        .on('error', function (err) {
          console.error('Error generating thumbnail', err);
          throw new BadRequestException('Error generating thumbnail');
        })
        .screenshots({
          count: 1,
          //take screenshot at 0.0
          timestamps: ['0.0'],
          folder: '/tmp',
          filename: thumbnailFilename,
        });
    });
  }

  //add admin activity
  async addAdminActivity(
    admin: Admin,
    activity: string,
    activity_type: string,
    activity_ref: string,
    data: object = {},
  ): Promise<boolean> {
    const adminActivity = new AdminActivity();
    adminActivity.admin = admin;
    adminActivity.activity = activity;
    adminActivity.activity_type = activity_type;
    adminActivity.activity_ref = activity_ref;
    adminActivity.data = data;
    await this.adminActivityRepository.save(adminActivity);
    return true;
  }
}
