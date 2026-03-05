import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                passwordHash: hashedPassword,
            },
        });

        const organization = await this.prisma.organization.create({
            data: {
                name: dto.organizationName,
            },
        });

        await this.prisma.organizationMember.create({
            data: {
                role: 'OWNER',
                userId: user.id,
                organizationId: organization.id,
            },
        });

        const tokens = await this.generateTokens(user.id, user.email);

        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user || !user.passwordHash) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(
            dto.password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user.id, user.email);

        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return tokens;
    }

    async refresh(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
            });

            const userId = payload.sub;

            const sessions = await this.prisma.session.findMany({
                where: { userId },
            });

            let validSession: any = null;

            for (const session of sessions) {
                const isMatch = await bcrypt.compare(
                    refreshToken,
                    session.refreshTokenHash,
                );

                if (isMatch) {
                    validSession = session;
                    break;
                }
            }

            if (!validSession) {
                throw new BadRequestException('Invalid refresh token');
            }

            // Delete old session (rotation)
            await this.prisma.session.delete({
                where: { id: validSession.id },
            });

            const tokens = await this.generateTokens(userId, payload.email);

            await this.saveRefreshToken(userId, tokens.refreshToken);

            return tokens;
        } catch (err) {
            throw new BadRequestException('Invalid refresh token');
        }
    }

    private async generateTokens(userId: string, email: string) {
        const accessToken = await this.jwtService.signAsync(
            { sub: userId, email },
            {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '15m',
            },
        );

        const refreshToken = await this.jwtService.signAsync(
            { sub: userId, email },
            {
                secret: this.config.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            },
        );

        return { accessToken, refreshToken };
    }

    private async saveRefreshToken(userId: string, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);

        await this.prisma.session.create({
            data: {
                userId,
                refreshTokenHash: hashed,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
    }
}