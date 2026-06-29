import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AddMemberDto } from './dto/add-member.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
    constructor(
        private organizationsService: OrganizationsService,
    ) { }

    @Get('members')
    getMembers(@CurrentUser() user: any) {
        return this.organizationsService.getMembers(
            user.userId,
        );
    }

    @Post('members')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.OWNER, Role.ADMIN)
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