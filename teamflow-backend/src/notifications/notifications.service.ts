import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    async createNotification(
        userId: string,
        organizationId: string,
        type: NotificationType,
        referenceId: string,
    ) {
        return this.prisma.notification.create({
            data: {
                userId,
                organizationId,
                type,
                referenceId,
            },
        });
    }

    async getUserNotifications(
        userId: string,
        query: NotificationQueryDto,
    ) {
        const {
            page,
            limit,
            type,
            isRead,
        } = query;

        const skip = (page - 1) * limit;

        const where = {
            userId,

            ...(type && { type }),

            ...(isRead !== undefined && { isRead }),
        };

        const [notifications, total] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),

            this.prisma.notification.count({
                where,
            }),
        ]);

        return {
            data: notifications,
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

    async getUnreadCount(userId: string) {
        const count = await this.prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });

        return { count };
    }

    async markAsRead(notificationId: string) {
        return this.prisma.notification.update({
            where: {
                id: notificationId,
            },
            data: {
                isRead: true,
            },
        });
    }

    async markAllAsRead(userId: string) {
        const result = await this.prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });

        return {
            message: 'All notifications marked as read',
            updatedCount: result.count,
        };
    }
}