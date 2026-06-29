import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Get organization users',
        description: 'Returns all users belonging to the current organization.',
    })
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    getUsers(@CurrentUser() user: any) {
        return this.usersService.getOrganizationUsers(
            user.userId,
        );
    }

    @Patch(':id/role')
    @ApiOperation({
        summary: 'Update user role',
        description: 'Updates the role of a user within the organization.',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                role: {
                    type: 'string',
                    enum: Object.values(Role),
                    example: 'ADMIN',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'User role updated successfully',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    updateRole(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body('role') role: Role,
    ) {
        return this.usersService.updateUserRole(
            user.userId,
            id,
            role,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Remove user',
        description: 'Removes a user from the current organization.',
    })
    @ApiResponse({
        status: 200,
        description: 'User removed successfully',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    removeUser(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.usersService.removeUser(
            user.userId,
            id,
        );
    }
}