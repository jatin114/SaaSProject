import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {

    @ApiProperty({
        example: 'JWT authentication has been implemented successfully.',
        description: 'Comment content.',
    })
    @IsString()
    content: string;

    @ApiProperty({
        example: '29b4cdd8-7ccd-49d9-a270-4c1a0c8670ff',
        description: 'Task ID on which the comment will be added.',
    })
    @IsString()
    taskId: string;
}