import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    ActivityLogsModule,
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    RolesGuard,
  ],
})
export class TasksModule { }