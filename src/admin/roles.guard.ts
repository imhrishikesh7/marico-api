import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminService } from './admin.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    if (!request.admin) {
      throw new UnauthorizedException('Unauthorized Role');
    }
    const adminRole = request.admin.role;
    if (adminRole.is_active === false) {
      throw new UnauthorizedException('Unauthorized Role');
    }

    if (adminRole.is_super_admin === true) {
      return true;
    }

    const adminPermissions = adminRole.permissions;
    if (adminPermissions.length === 0) {
      throw new UnauthorizedException('Unauthorized Role');
    }

    const hasRole = (): boolean => roles.some(role => adminPermissions.includes(role));
    if (hasRole()) {
      return true;
    }
    throw new UnauthorizedException('Unauthorized Role');
  }
}
