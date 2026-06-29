import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getOrganizationUsers(userId: string) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        return this.prisma.organizationMember.findMany({
            where: {
                organizationId: membership.organizationId,
            },
            include: {
                user: true,
            },
        });
    }

    async updateUserRole(userId: string, targetUserId: string, role: Role) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        return this.prisma.organizationMember.updateMany({
            where: {
                userId: targetUserId,
                organizationId: membership.organizationId,
            },
            data: { role },
        });
    }

    async removeUser(userId: string, targetUserId: string) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        return this.prisma.organizationMember.deleteMany({
            where: {
                userId: targetUserId,
                organizationId: membership.organizationId,
            },
        });
    }
}