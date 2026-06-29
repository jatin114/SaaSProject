import {
    Controller,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ActivityLogsService } from './activity-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ActivityLogQueryDto } from './dto/activity-log-query.dto';

@Controller('activity-logs')
@UseGuards(JwtAuthGuard)
export class ActivityLogsController {
    constructor(
        private activityLogsService: ActivityLogsService,
    ) { }

    @Get()
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