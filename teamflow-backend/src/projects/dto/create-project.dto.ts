import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {

    @ApiProperty({
        example: 'TeamFlow Backend',
        description: 'Name of the project.',
    })
    @IsString()
    name: string;

    @ApiPropertyOptional({
        example: 'Backend APIs for the TeamFlow SaaS application.',
        description: 'Short description of the project.',
    })
    @IsOptional()
    @IsString()
    description?: string;
}