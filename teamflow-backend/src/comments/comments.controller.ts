import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
    ) { }

    @Post()
    @ApiOperation({
        summary: 'Create comment',
        description: 'Adds a new comment to a task.',
    })
    @ApiBody({
        type: CreateCommentDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Comment created successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Validation failed.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    createComment(
        @CurrentUser() user: any,
        @Body() dto: CreateCommentDto,
    ) {
        return this.commentsService.createComment(
            user.userId,
            dto,
        );
    }

    @Get()
    @ApiOperation({
        summary: 'Get comments',
        description: 'Returns all comments for a specific task.',
    })
    @ApiQuery({
        name: 'taskId',
        required: true,
        example: '29b4cdd8-7ccd-49d9-a270-4c1a0c8670ff',
        description: 'Task ID.',
    })
    @ApiResponse({
        status: 200,
        description: 'Comments fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getComments(
        @CurrentUser() user: any,
        @Query('taskId') taskId: string,
    ) {
        return this.commentsService.getComments(
            user.userId,
            taskId,
        );
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete comment',
        description: 'Deletes a comment.',
    })
    @ApiParam({
        name: 'id',
        description: 'Comment ID.',
        example: '18f2dcb0-b744-421c-890d-537230eb0857',
    })
    @ApiResponse({
        status: 200,
        description: 'Comment deleted successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 404,
        description: 'Comment not found.',
    })
    deleteComment(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.commentsService.deleteComment(
            user.userId,
            id,
        );
    }
}