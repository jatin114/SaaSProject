import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
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

import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AddMemberDto } from './dto/add-member.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Organizations')
@ApiBearerAuth()
@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
    constructor(
        private readonly organizationsService: OrganizationsService,
    ) { }

    @Get('members')
    @ApiOperation({
        summary: 'Get organization members',
        description:
            'Returns all members of the current organization.',
    })
    @ApiResponse({
        status: 200,
        description: 'Organization members fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getMembers(
        @CurrentUser() user: any,
    ) {
        return this.organizationsService.getMembers(
            user.userId,
        );
    }

    @Post('members')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    @ApiOperation({
        summary: 'Add organization member',
        description:
            'Adds an existing user to the current organization.',
    })
    @ApiBody({
        type: AddMemberDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Member added successfully.',
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
        description: 'User not found.',
    })
    addMember(
        @CurrentUser() user: any,
        @Body() dto: AddMemberDto,
    ) {
        return this.organizationsService.addMember(
            user.userId,
            dto,
        );
    }

    @Delete('members/:userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.OWNER)
    @ApiOperation({
        summary: 'Remove organization member',
        description:
            'Removes a member from the current organization.',
    })
    @ApiParam({
        name: 'userId',
        description: 'User ID of the member.',
        example: 'b18a45fb-9a9a-4d90-abaf-a9099a8e31c2',
    })
    @ApiResponse({
        status: 200,
        description: 'Member removed successfully.',
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
        description: 'Member not found.',
    })
    removeMember(
        @CurrentUser() user: any,
        @Param('userId') userId: string,
    ) {
        return this.organizationsService.removeMember(
            user.userId,
            userId,
        );
    }
}