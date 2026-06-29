import {
    Injectable,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const requiredRoles =
            this.reflector.getAllAndOverride<string[]>(
                ROLES_KEY,
                [
                    context.getHandler(),
                    context.getClass(),
                ],
            );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        const membership =
            await this.prisma.organizationMember.findFirst({
                where: {
                    userId: user.userId,
                },
            });

        if (!membership) {
            return false;
        }

        return requiredRoles.includes(
            membership.role,
        );
    }
}