import {
    Controller,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { ActivityLogsService } from './activity-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ActivityLogQueryDto } from './dto/activity-log-query.dto';

@ApiTags('Activity Logs')
@ApiBearerAuth()
@Controller('activity-logs')
@UseGuards(JwtAuthGuard)
export class ActivityLogsController {
    constructor(
        private readonly activityLogsService: ActivityLogsService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Get activity logs',
        description:
            'Returns a paginated list of activity logs for the current organization with optional filters.',
    })
    @ApiResponse({
        status: 200,
        description: 'Activity logs fetched successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    getLogs(
        @CurrentUser() user: any,
        @Query() query: ActivityLogQueryDto,
    ) {
        return this.activityLogsService.getLogs(
            user.userId,
            query,
        );
    }
}