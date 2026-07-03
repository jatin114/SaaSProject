import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Get all projects',
        description:
            'Returns a paginated list of projects belonging to the current organization.',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: 'Projects fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getProjects(
        @CurrentUser() user: any,
        @Query() pagination: PaginationQueryDto,
    ) {
        return this.projectsService.getProjects(
            user.userId,
            pagination,
        );
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
        Role.MANAGER,
    )
    @ApiOperation({
        summary: 'Create project',
        description:
            'Creates a new project within the current organization.',
    })
    @ApiBody({
        type: CreateProjectDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Project created successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    createProject(
        @CurrentUser() user: any,
        @Body() dto: CreateProjectDto,
    ) {
        return this.projectsService.createProject(
            user.userId,
            dto,
        );
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get project by ID',
        description:
            'Returns details of a specific project.',
    })
    @ApiParam({
        name: 'id',
        description: 'Project ID',
        example: '6d78e53d-5f12-4d8a-b0b8-6ab18d0ef5e8',
    })
    @ApiResponse({
        status: 200,
        description: 'Project fetched successfully.',
    })
    @ApiResponse({
        status: 404,
        description: 'Project not found.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getProject(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.projectsService.getProjectById(
            user.userId,
            id,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(
        Role.OWNER,
        Role.ADMIN,
    )
    @ApiOperation({
        summary: 'Delete project',
        description:
            'Deletes a project from the current organization.',
    })
    @ApiParam({
        name: 'id',
        description: 'Project ID',
        example: '6d78e53d-5f12-4d8a-b0b8-6ab18d0ef5e8',
    })
    @ApiResponse({
        status: 200,
        description: 'Project deleted successfully.',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.',
    })
    @ApiResponse({
        status: 404,
        description: 'Project not found.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    deleteProject(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.projectsService.deleteProject(
            user.userId,
            id,
        );
    }
}