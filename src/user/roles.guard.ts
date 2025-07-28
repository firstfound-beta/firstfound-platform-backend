import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    // Debugging: Log user object
    console.log('User object in request:', user);

    // Assuming user has a 'roles' property which is an array
    if (!user || !Array.isArray(user.role)) {
        console.error('User roles not found or invalid.');
        return false; // Deny access if roles are not present
      }
      
      return requiredRoles.some((role) => user.role.includes(role));
      
  }
}
