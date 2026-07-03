import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {

    @ApiProperty({
        example: 'jatin@example.com',
        description: 'Registered email address.',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password@123',
        description: 'User account password.',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    password: string;
}