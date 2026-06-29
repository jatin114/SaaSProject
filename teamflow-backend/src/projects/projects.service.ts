import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ActivityLogsService } from '../activity-logs/activity-logs.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ProjectsService {
    constructor(
        private prisma: PrismaService,
        private activityLogsService: ActivityLogsService,
    ) { }

    async getProjects(
        userId: string,
        pagination: PaginationQueryDto,
    ) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        const { page, limit } = pagination;

        const skip = (page - 1) * limit;

        const where = {
            organizationId: membership.organizationId,
            isArchived: false,

            ...(pagination.search
                ? {
                    OR: [
                        {
                            name: {
                                contains: pagination.search,
                                mode: 'insensitive' as const,
                            },
                        },
                        {
                            description: {
                                contains: pagination.search,
                                mode: 'insensitive' as const,
                            },
                        },
                    ],
                }
                : {}),
        };

        const [projects, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),

            this.prisma.project.count({
                where,
            }),
        ]);

        return {
            data: projects,

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1,
            },
        };
    }

    async createProject(userId: string, dto: CreateProjectDto) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        console.log("USER ID:", userId);
        console.log("MEMBERSHIP:", membership);

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        if (!dto.name) {
            throw new BadRequestException('Project name is required');
        }

        const project = await this.prisma.project.create({
            data: {
                name: dto.name,
                description: dto.description,
                organizationId: membership.organizationId,
                createdById: userId,
            },
        });

        await this.activityLogsService.createLog(
            userId,
            membership.organizationId,
            'PROJECT_CREATED',
            'PROJECT',
            project.id,
        );

        return project;
    }

    async getProjectById(userId: string, projectId: string) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        return this.prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: membership.organizationId,
            },
        });
    }

    async deleteProject(userId: string, projectId: string) {
        const membership = await this.prisma.organizationMember.findFirst({
            where: { userId },
        });

        if (!membership) {
            throw new NotFoundException('Organization not found');
        }

        return this.prisma.project.deleteMany({
            where: {
                id: projectId,
                organizationId: membership.organizationId,
            },
        });
    }
}