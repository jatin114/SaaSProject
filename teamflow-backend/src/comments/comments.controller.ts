import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Query,
    Param,
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
    constructor(private commentsService: CommentsService) { }

    @Post()
    createComment(@CurrentUser() user: any, @Body() dto: CreateCommentDto) {
        return this.commentsService.createComment(user.userId, dto);
    }

    @Get()
    getComments(
        @CurrentUser() user: any,
        @Query('taskId') taskId: string,
    ) {
        return this.commentsService.getComments(user.userId, taskId);
    }

    @Delete(':id')
    deleteComment(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.commentsService.deleteComment(user.userId, id);
    }
}