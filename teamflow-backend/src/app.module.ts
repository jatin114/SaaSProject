import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { HealthModule } from './health/health.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,

      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),

        JWT_SECRET: Joi.string()
          .min(16)
          .required(),

        JWT_REFRESH_SECRET: Joi.string()
          .min(16)
          .required(),

        PORT: Joi.number().default(3000),
      }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
    NotificationsModule,
    OrganizationsModule,
    ActivityLogsModule,
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule { }