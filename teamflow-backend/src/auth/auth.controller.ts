import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';

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
    @ApiResponse({
        status: 409,
        description: 'Email already exists.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
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
            'Authenticates a user and returns an access token along with a refresh token.',
    })
    @ApiBody({
        type: LoginDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid email or password.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
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
        description: 'Access token refreshed successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid refresh token.',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error.',
    })
    async refresh(
        @Body() dto: RefreshDto,
    ) {
        return this.authService.refresh(
            dto.refreshToken,
        );
    }
}