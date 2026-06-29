import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AddMemberDto } from './dto/add-member.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';

@Injectable()
export class OrganizationsService {
    constructor(
        private prisma: PrismaService,
        private activityLogsService: ActivityLogsService,
    ) { }

    async getMembers(userId: string) {
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

    async addMember(ownerUserId: string, dto: AddMemberDto) {
        const ownerMembership =
            await this.prisma.organizationMember.findFirst({
                where: {
                    userId: ownerUserId,
                },
            });

        if (!ownerMembership) {
            throw new NotFoundException('Organization not found');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existingMembership =
            await this.prisma.organizationMember.findFirst({
                where: {
                    userId: user.id,
                    organizationId: ownerMembership.organizationId,
                },
            });

        if (existingMembership) {
            throw new BadRequestException(
                'User already belongs to organization',
            );
        }

        const member = await this.prisma.organizationMember.create({
            data: {
                userId: user.id,
                organizationId: ownerMembership.organizationId,
                role: dto.role,
            },
        });

        await this.activityLogsService.createLog(
            ownerUserId,
            ownerMembership.organizationId,
            'MEMBER_ADDED',
            'ORGANIZATION_MEMBER',
            user.id,
        );

        return member;
    }

    async removeMember(
        ownerUserId: string,
        targetUserId: string,
    ) {
        const ownerMembership =
            await this.prisma.organizationMember.findFirst({
                where: {
                    userId: ownerUserId,
                },
            });

        if (!ownerMembership) {
            throw new NotFoundException('Organization not found');
        }

        const result = await this.prisma.organizationMember.deleteMany({
            where: {
                userId: targetUserId,
                organizationId: ownerMembership.organizationId,
            },
        });

        await this.activityLogsService.createLog(
            ownerUserId,
            ownerMembership.organizationId,
            'MEMBER_REMOVED',
            'ORGANIZATION_MEMBER',
            targetUserId,
        );

        return result;
    }
}