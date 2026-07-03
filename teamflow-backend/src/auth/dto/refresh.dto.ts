import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {

    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxxxxx',
        description:
            'Valid refresh token used to generate a new access token.',
    })
    @IsString()
    refreshToken: string;
}