import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
        Role.MANAGER,
    )
    @ApiOperation({
        summary: 'Create task',
        description:
            'Creates a new task within a project.',
    })
    @ApiBody({
        type: CreateTaskDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Task created successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.',
    })
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
    @ApiOperation({
        summary: 'Get tasks',
        description:
            'Returns a paginated list of tasks with optional filters.',
    })
    @ApiResponse({
        status: 200,
        description: 'Tasks fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
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
    @ApiOperation({
        summary: 'Update task',
        description:
            'Updates an existing task.',
    })
    @ApiParam({
        name: 'id',
        description: 'Task ID',
        example: '29b4cdd8-7ccd-49d9-a270-4c1a0c8670ff',
    })
    @ApiResponse({
        status: 200,
        description: 'Task updated successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.',
    })
    @ApiResponse({
        status: 404,
        description: 'Task not found.',
    })
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
    @ApiOperation({
        summary: 'Delete task',
        description:
            'Deletes a task.',
    })
    @ApiParam({
        name: 'id',
        description: 'Task ID',
        example: '29b4cdd8-7ccd-49d9-a270-4c1a0c8670ff',
    })
    @ApiResponse({
        status: 200,
        description: 'Task deleted successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.',
    })
    @ApiResponse({
        status: 404,
        description: 'Task not found.',
    })
    deleteTask(
        @Param('id') id: string,
    ) {
        return this.tasksService.deleteTask(id);
    }
}