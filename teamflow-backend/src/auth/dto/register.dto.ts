import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {

    @ApiProperty({
        example: 'Jatin Vashishtha',
        description: 'Full name of the user.',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'jatin@example.com',
        description: 'Unique email address.',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password@123',
        description: 'Password (minimum 6 characters).',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 'TeamFlow Technologies',
        description: 'Organization name.',
    })
    @IsString()
    organizationName: string;
}