import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';

@Injectable()
export class CommentsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
        private activityLogsService: ActivityLogsService,
    ) { }

    async createComment(userId: string, dto: CreateCommentDto) {
        // check membership
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        // check task
        const task = await this.prisma.task.findFirst({
            where: { id: dto.taskId },
            include: {
                project: true,
            },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // ensure same organization
        if (task.project.organizationId !== membership.organizationId) {
            throw new NotFoundException('Access denied');
        }

        // ✅ STEP 1: create comment
        const comment = await this.prisma.comment.create({
            data: {
                content: dto.content,
                taskId: dto.taskId,
                userId,
            },
        });

        await this.activityLogsService.createLog(
            userId,
            membership.organizationId,
            'COMMENT_ADDED',
            'COMMENT',
            comment.id,
        );

        // ✅ STEP 2: notify assigned user (if exists & not self)
        if (task.assignedUserId && task.assignedUserId !== userId) {
            await this.notificationsService.createNotification(
                task.assignedUserId,
                membership.organizationId,
                'COMMENT_ADDED',
                dto.taskId,
            );
        }

        return comment;
    }

    async getComments(userId: string, taskId: string) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        const task = await this.prisma.task.findFirst({
            where: { id: taskId },
            include: {
                project: true,
            },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.project.organizationId !== membership.organizationId) {
            throw new NotFoundException('Access denied');
        }

        return this.prisma.comment.findMany({
            where: { taskId },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }

    async deleteComment(userId: string, commentId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        if (comment.userId !== userId) {
            throw new NotFoundException('Not allowed');
        }

        return this.prisma.comment.delete({
            where: { id: commentId },
        });
    }
}