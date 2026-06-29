import { Controller, Post, Body } from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({
        summary: 'Register a new user',
        description:
            'Creates a new user along with a new organization and assigns the OWNER role.',
    })
    @ApiBody({
        type: RegisterDto,
    })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed',
    })
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    @ApiOperation({
        summary: 'Login user',
        description: 'Authenticate user and return access & refresh tokens.',
    })
    @ApiBody({
        type: LoginDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid email or password',
    })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @ApiOperation({
        summary: 'Refresh access token',
        description:
            'Generate a new access token using a valid refresh token.',
    })
    @ApiBody({
        type: RefreshDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Access token refreshed successfully',
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid refresh token',
    })
    async refresh(@Body() dto: RefreshDto) {
        return this.authService.refresh(dto.refreshToken);
    }
}