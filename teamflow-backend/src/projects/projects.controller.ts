import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(
        private projectsService: ProjectsService,
    ) { }

    @Get()
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