import {
    Controller,
    Get,
    Patch,
    Param,
    UseGuards,
    Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(
        private notificationsService: NotificationsService,
    ) { }

    @Get()
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
    getUnreadCount(@CurrentUser() user: any) {
        return this.notificationsService.getUnreadCount(
            user.userId,
        );
    }

    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.notificationsService.markAsRead(id);
    }

    @Patch('read-all')
    markAllAsRead(@CurrentUser() user: any) {
        return this.notificationsService.markAllAsRead(
            user.userId,
        );
    }
}