import {
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { NotificationQueryDto } from './dto/notification-query.dto';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Get notifications',
        description:
            'Returns a paginated list of notifications for the authenticated user.',
    })
    @ApiResponse({
        status: 200,
        description: 'Notifications fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getNotifications(
        @CurrentUser() user: any,
        @Query() query: NotificationQueryDto,
    ) {
        return this.notificationsService.getUserNotifications(
            user.userId,
            query,
        );
    }

    @Get('unread-count')
    @ApiOperation({
        summary: 'Get unread notification count',
        description:
            'Returns the total number of unread notifications for the authenticated user.',
    })
    @ApiResponse({
        status: 200,
        description: 'Unread notification count fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getUnreadCount(
        @CurrentUser() user: any,
    ) {
        return this.notificationsService.getUnreadCount(
            user.userId,
        );
    }

    @Patch(':id/read')
    @ApiOperation({
        summary: 'Mark notification as read',
        description:
            'Marks a specific notification as read.',
    })
    @ApiParam({
        name: 'id',
        description: 'Notification ID.',
        example: '18f2dcb0-b744-421c-890d-537230eb0857',
    })
    @ApiResponse({
        status: 200,
        description: 'Notification marked as read.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 404,
        description: 'Notification not found.',
    })
    markAsRead(
        @Param('id') id: string,
    ) {
        return this.notificationsService.markAsRead(
            id,
        );
    }

    @Patch('read-all')
    @ApiOperation({
        summary: 'Mark all notifications as read',
        description:
            'Marks all unread notifications of the authenticated user as read.',
    })
    @ApiResponse({
        status: 200,
        description: 'All notifications marked as read.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    markAllAsRead(
        @CurrentUser() user: any,
    ) {
        return this.notificationsService.markAllAsRead(
            user.userId,
        );
    }
}