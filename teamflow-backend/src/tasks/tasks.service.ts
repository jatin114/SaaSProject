import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { TaskQueryDto } from './dto/task-query.dto';

@Injectable()
export class TasksService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
        private activityLogsService: ActivityLogsService,
    ) { }

    async createTask(userId: string, dto: CreateTaskDto) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        // Verify project belongs to same organization
        const project = await this.prisma.project.findFirst({
            where: {
                id: dto.projectId,
                organizationId: membership.organizationId,
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        // Create task
        const task = await this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                projectId: dto.projectId,
                assignedUserId: dto.assignedUserId,
                priority: dto.priority || 'MEDIUM',
                createdById: userId,
            },
        });

        // Activity Log: Task Created
        await this.activityLogsService.createLog(
            userId,
            membership.organizationId,
            'TASK_CREATED',
            'TASK',
            task.id,
        );

        // If task assigned to someone
        if (dto.assignedUserId) {

            // Notification
            await this.notificationsService.createNotification(
                dto.assignedUserId,
                membership.organizationId,
                'TASK_ASSIGNED',
                task.id,
            );

            // Activity Log
            await this.activityLogsService.createLog(
                userId,
                membership.organizationId,
                'TASK_ASSIGNED',
                'TASK',
                task.id,
            );
        }

        return task;
    }

    async getTasks(
        userId: string,
        query: TaskQueryDto,
    ) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        const {
            page,
            limit,
            search,
            projectId,
            status,
            priority,
            assignedUserId,
        } = query;

        const skip = (page - 1) * limit;

        const where = {
            project: {
                organizationId: membership.organizationId,
            },

            ...(projectId && { projectId }),

            ...(search
                ? {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: 'insensitive' as const,
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: 'insensitive' as const,
                            },
                        },
                    ],
                }
                : {}),

            ...(status && { status }),

            ...(priority && { priority }),

            ...(assignedUserId && { assignedUserId }),
        };

        const [tasks, total] = await Promise.all([
            this.prisma.task.findMany({
                where,
                skip,
                take: limit,
                include: {
                    assignedUser: true,
                    project: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),

            this.prisma.task.count({
                where,
            }),
        ]);

        return {
            data: tasks,
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

    async updateTask(userId: string, taskId: string, data: any) {
        return this.prisma.task.update({
            where: { id: taskId },
            data,
        });
    }

    async deleteTask(taskId: string) {
        return this.prisma.task.delete({
            where: { id: taskId },
        });
    }
}