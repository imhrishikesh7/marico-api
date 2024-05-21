import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AdminRequest } from '../interfaces/adminrequest.interface';
import { EmptystringPipe } from '../validations/emptystring/emptystring.pipe';
import { EmailPipe } from '../validations/email/email.pipe';
import { Role } from './entities/role.entity';
import { MenuItem } from '../lib/menu';
import { Permission } from '../lib/permissions';
import { Roles } from './roles.decorator';
import { SwitchPipe } from '../validations/switch/switch.pipe';
import { ParseDatePipe } from '../validations/parsedate/parsedate.pipe';
import { AdminActivity } from './entities/admin_activity.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminOnly } from './admin.decorator';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(REQUEST) private readonly request: AdminRequest,
  ) {}

  //login
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'sample@jetbro.in',
        },
        password: {
          type: 'string',
          example: 'sample',
        },
      },
    },
  })
  @Post('/login')
  async login(
    @Body('email', EmailPipe) email: string,
    @Body('password', EmptystringPipe) password: string,
  ): Promise<{
    unique_id: string;
    name: string;
    email: string;
    landing_url: string;
    permissions: string[];
    is_super_admin: boolean;
    token: string;
  }> {
    const admin = await this.adminService.login(email, password);

    return {
      unique_id: admin.unique_id,
      name: admin.name,
      email: admin.email,
      landing_url: admin.role.landing_url,
      permissions: admin.role.permissions,
      is_super_admin: admin.role.is_super_admin,
      token: await this.adminService.generateToken(admin),
    };
  }

  //get admin info
  @AdminOnly()
  @ApiBearerAuth()
  @Get('/info')
  async info(): Promise<{
    unique_id: string;
    name: string;
    email: string;
    landing_url: string;
    permissions: string[];
    is_super_admin: boolean;
  }> {
    const admin = this.request.admin;

    return {
      unique_id: admin.unique_id,
      name: admin.name,
      email: admin.email,
      landing_url: admin.role.landing_url,
      permissions: admin.role.permissions,
      is_super_admin: admin.role.is_super_admin,
    };
  }

  //get admin menu
  @AdminOnly()
  @ApiBearerAuth()
  @Post('/menu')
  @Roles([])
  async menu(): Promise<MenuItem[]> {
    const admin = this.request.admin;
    if (admin) {
      return await this.adminService.getMenuListForRole(admin.role);
    } else {
      return [];
    }
  }

  //logout
  @AdminOnly()
  @ApiBearerAuth()
  @Post('/logout')
  async logout(): Promise<boolean> {
    const admin = this.request.admin;
    await this.adminService.logout(admin);
    return true;
  }

  //get admins
  @AdminOnly()
  @ApiBearerAuth()
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Get('/admins')
  async admins(): Promise<
    {
      id: number;
      name: string;
      email: string;
      role: Role;
      is_active: boolean;
    }[]
  > {
    return await this.adminService.getAdmins();
  }

  //get admin by id
  @AdminOnly()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Get('/user/:id')
  async admin(@Param('id', ParseIntPipe) id: number): Promise<{
    admin: {
      id: number;
      name: string;
      email: string;
      role: Role;
      is_active: boolean;
    } | null;
    roles: Role[];
  }> {
    const admin = await this.adminService.getAdminById(id);
    const roles = await this.adminService.getRoles();
    return {
      admin: admin,
      roles: roles,
    };
  }

  //get roles
  @AdminOnly()
  @ApiBearerAuth()
  @Roles(['ADMIN', 'ADMIN_ROLES'])
  @Get('/roles')
  async roles(): Promise<Role[]> {
    return await this.adminService.getRoles();
  }

  //get role by id
  @AdminOnly()
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  @Roles(['ADMIN', 'ADMIN_ROLES'])
  @Get('/role/:id')
  async role(@Param('id', ParseIntPipe) id: number): Promise<{
    role: Role | null;
    permissions: Permission[];
  }> {
    const role = await this.adminService.getRoleById(id);
    const permissions = await this.adminService.getPermissions();
    return {
      role: role,
      permissions: permissions,
    };
  }

  //get activities from start date to end date, page
  @AdminOnly()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'start_date',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'end_date',
    type: 'string',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
  })
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Get('/activities')
  async activities(
    @Query('start_date', new DefaultValuePipe('today'), ParseDatePipe)
    start_date: Date,
    @Query('end_date', new DefaultValuePipe('today'), ParseDatePipe)
    end_date: Date,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Promise<{
    activities: AdminActivity[];
    total: number;
    total_pages: number;
    page: number;
    per_page: number;
  }> {
    const limit = 50;
    const activitiesAndTotal = await this.adminService.getActivities(
      start_date,
      end_date,
      page,
      limit,
    );
    const activities = activitiesAndTotal.adminActivities;
    const total = activitiesAndTotal.total;
    const total_pages = Math.ceil(total / limit);

    return {
      activities: activities,
      total: total,
      total_pages: total_pages,
      page: page,
      per_page: limit,
    };
  }

  //get permission list
  @AdminOnly()
  @ApiBearerAuth()
  @Roles(['ADMIN', 'ADMIN_ROLES'])
  @Get('/permissions')
  async permissions(): Promise<Permission[]> {
    return await this.adminService.getPermissions();
  }

  //POST admin/add
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'sample',
        },
        email: {
          type: 'string',
          example: '',
        },
        password: {
          type: 'string',
          example: '',
        },
        role_id: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @AdminOnly()
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Post('/add')
  async add(
    @Body('name', EmptystringPipe) name: string,
    @Body('email', EmailPipe) email: string,
    @Body('password', EmptystringPipe) password: string,
    @Body('role_id', ParseIntPipe) role_id: number,
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<boolean> {
    await this.adminService.newAdmin(
      this.request.admin,
      name,
      email,
      password,
      role_id,
      is_active,
    );
    return true;
  }

  //POST admin/update
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'sample',
        },
        email: {
          type: 'string',
          example: '',
        },
        role_id: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @AdminOnly()
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Post('/update')
  async update(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', EmptystringPipe) name: string,
    @Body('email', EmailPipe) email: string,
    @Body('role_id', ParseIntPipe) role_id: number,
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<boolean> {
    await this.adminService.updateAdmin(
      this.request.admin,
      id,
      name,
      email,
      role_id,
      is_active,
    );
    return true;
  }

  //POST admin/update-password
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        password: {
          type: 'string',
          example: '',
        },
      },
    },
  })
  @AdminOnly()
  @Roles(['ADMIN', 'ADMIN_USERS'])
  @Post('/update-password')
  async updatepassword(
    @Body('id', ParseIntPipe) id: number,
    @Body('password', EmptystringPipe) password: string,
  ): Promise<boolean> {
    await this.adminService.updateAdminPassword(
      this.request.admin,
      id,
      password,
    );
    return true;
  }

  //POST admin/role/add
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'sample',
        },
        permissions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'ADMIN_USERS',
          },
        },
        landing_url: {
          type: 'string',
          example: '/dashboard',
        },
      },
    },
  })
  @AdminOnly()
  @Roles(['ADMIN', 'ADMIN_ROLES'])
  @Post('/role/add')
  async addRole(
    @Body('name', EmptystringPipe) name: string,
    @Body('permissions') permissions: string[],
    @Body('landing_url', EmptystringPipe) landing_url: string,
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<boolean> {
    //check if permissions is an array of strings and not empty
    if (!Array.isArray(permissions) || !permissions.length) {
      throw new Error('Permissions must be an array of strings');
    }

    await this.adminService.newRole(
      this.request.admin,
      name,
      permissions,
      landing_url,
      is_active,
    );
    return true;
  }

  //POST admin/role/update
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'sample',
        },

        permissions: {
          type: 'array',
          items: {
            type: 'string',
            example: 'ADMIN_USERS',
          },
        },
        landing_url: {
          type: 'string',
          example: '/dashboard',
        },
      },
    },
  })
  @AdminOnly()
  @Roles(['ADMIN', 'ADMIN_ROLES'])
  @Post('/role/update')
  async updateRole(
    @Body('id', ParseIntPipe) id: number,
    @Body('name', EmptystringPipe) name: string,
    @Body('permissions') permissions: string[],
    @Body('landing_url', EmptystringPipe) landing_url: string,
    @Body('is_active', SwitchPipe) is_active: boolean,
  ): Promise<boolean> {
    //check if permissions is an array of strings and not empty
    if (!Array.isArray(permissions) || !permissions.length) {
      throw new Error('Permissions must be an array of strings');
    }
    await this.adminService.updateRole(
      this.request.admin,
      id,
      name,
      permissions,
      landing_url,
      is_active,
    );
    return true;
  }

  //upload file multipart
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @AdminOnly()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ location: string; thumbnail?: string }> {
    //upload file to s3
    const location = await this.adminService.uploadFileToS3(file);
    //generate thumbnail for video mp4
    return {
      location: location,
    };
    // if (file.mimetype === "video/mp4") {
    //   const thumbnailResponse = await this.adminService.generateThumbnailForVideoFile(file);

    //   return {
    //     location: location,
    //     thumbnail: thumbnailResponse.location,
    //   };
    // } else {
    //   return {
    //     location: location,
    //   };
    // }
  }
}
