import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ActivityLogsModule } from 'src/activity-logs/activity-logs.module';

@Module({
  imports: [
    PrismaModule,
    ActivityLogsModule,
  ],
  controllers: [OrganizationsController],
  providers: [
    OrganizationsService,
    RolesGuard,
  ],
})
export class OrganizationsModule { }