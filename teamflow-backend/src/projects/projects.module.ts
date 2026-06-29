import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ActivityLogsModule } from '../activity-logs/activity-logs.module';

@Module({
  imports: [
    PrismaModule,
    ActivityLogsModule,
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    RolesGuard,
  ],
})
export class ProjectsModule { }