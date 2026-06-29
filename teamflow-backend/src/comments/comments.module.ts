import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
  imports: [PrismaModule, NotificationsModule, ActivityLogsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }