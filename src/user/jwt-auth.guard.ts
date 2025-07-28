import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    const isOptional = this.reflector.get<boolean>(
      'isOptional',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      if (isOptional) {
        request.user = null;
        return true;
      }
      throw new UnauthorizedException('Missing or invalid token');
    }

    // ✅ Only decode if authHeader is present and valid
    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = decoded;
      console.log('Decoded Token:', decoded);
      return true;
    } catch (error) {
      if (isOptional) {
        request.user = null;
        return true;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
