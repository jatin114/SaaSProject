import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description:
            'Creates a new user, creates a new organization, and assigns the OWNER role.',
    })
    @ApiBody({
        type: RegisterDto,
    })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    async register(
        @Body() dto: RegisterDto,
    ) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Login user',
        description:
            'Authenticates a user and returns access and refresh tokens.',
    })
    @ApiBody({
        type: LoginDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful.',
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials.',
    })
    async login(
        @Body() dto: LoginDto,
    ) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOperation({
        summary: 'Refresh access token',
        description:
            'Generates a new access token using a valid refresh token.',
    })
    @ApiBody({
        type: RefreshDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Token refreshed successfully.',
    })
    async refresh(
        @Body() dto: RefreshDto,
    ) {
        return this.authService.refresh(
            dto.refreshToken,
        );
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get current user profile',
        description:
            'Returns the authenticated user profile along with organization and role.',
    })
    @ApiResponse({
        status: 200,
        description: 'Profile fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getProfile(
        @CurrentUser() user: any,
    ) {
        return this.authService.getProfile(
            user.userId,
        );
    }
    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Change password',
        description:
            'Allows the authenticated user to change their password.',
    })
    @ApiBody({
        type: ChangePasswordDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Password changed successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid current password.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    changePassword(
        @CurrentUser() user: any,
        @Body() dto: ChangePasswordDto,
    ) {
        return this.authService.changePassword(
            user.userId,
            dto,
        );
    }
}