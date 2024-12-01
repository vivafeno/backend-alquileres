import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {   

    // Extraer los roles permitidos de la metadata
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    // Si no hay roles requeridos, permitir el acceso
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    // Extraer el usuario del request
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    // Si no hay usuario, lanzar un error
    if (!user) throw new BadRequestException('User not found');

    // Verificar si el usuario tiene alguno de los roles permitidos
    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    // Si no tiene ninguno de los roles permitidos, lanzar un error
    throw new ForbiddenException(`${user.fullName} does not have the required roles`);
  }
}
