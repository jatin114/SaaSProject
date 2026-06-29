import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TaskQueryDto } from './dto/task-query.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
        Role.MANAGER,
    )
    createTask(
        @CurrentUser() user: any,
        @Body() dto: CreateTaskDto,
    ) {
        return this.tasksService.createTask(
            user.userId,
            dto,
        );
    }

    @Get()
    getTasks(
        @CurrentUser() user: any,
        @Query() query: TaskQueryDto,
    ) {
        return this.tasksService.getTasks(
            user.userId,
            query,
        );
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
        Role.MANAGER,
    )
    updateTask(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.tasksService.updateTask(
            user.userId,
            id,
            body,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
    )
    deleteTask(
        @Param('id') id: string,
    ) {
        return this.tasksService.deleteTask(id);
    }
}