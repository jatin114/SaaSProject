import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

export class AddMemberDto {

    @ApiProperty({
        example: 'amit@example.com',
        description: 'Email address of the user to be added to the organization.',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        enum: Role,
        example: Role.MEMBER,
        description: 'Role to assign to the new organization member.',
    })
    @IsEnum(Role)
    role: Role;
}