import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityLogQueryDto } from './dto/activity-log-query.dto';

@Injectable()
export class ActivityLogsService {
    constructor(private prisma: PrismaService) { }

    async createLog(
        userId: string,
        organizationId: string,
        action: string,
        entityType: string,
        entityId?: string,
    ) {
        return this.prisma.activityLog.create({
            data: {
                userId,
                organizationId,
                action,
                entityType,
                entityId,
            },
        });
    }

    async getLogs(
        userId: string,
        query: ActivityLogQueryDto,
    ) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            return {
                data: [],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                },
            };
        }

        const {
            page,
            limit,
            search,
            action,
            entityType,
            userId: filterUserId,
        } = query;

        const skip = (page - 1) * limit;

        const where = {
            organizationId: membership.organizationId,

            ...(action && { action }),

            ...(entityType && { entityType }),

            ...(filterUserId && { userId: filterUserId }),

            ...(search
                ? {
                    OR: [
                        {
                            action: {
                                contains: search,
                                mode: 'insensitive' as const,
                            },
                        },
                        {
                            entityType: {
                                contains: search,
                                mode: 'insensitive' as const,
                            },
                        },
                    ],
                }
                : {}),
        };

        const [logs, total] = await Promise.all([
            this.prisma.activityLog.findMany({
                where,
                include: {
                    user: true,
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),

            this.prisma.activityLog.count({
                where,
            }),
        ]);

        return {
            data: logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1,
            },
        };
    }
}