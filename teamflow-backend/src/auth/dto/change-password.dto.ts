import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {

    @ApiProperty({
        example: '123456',
        description: 'Current password.',
    })
    @IsString()
    currentPassword: string;

    @ApiProperty({
        example: 'NewPassword@123',
        description: 'New password (minimum 6 characters).',
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    newPassword: string;
}