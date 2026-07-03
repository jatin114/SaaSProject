import { Controller, Get } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {

    @Get()
    @ApiOperation({
        summary: 'Health check',
        description:
            'Returns the current health status of the application.',
    })
    @ApiResponse({
        status: 200,
        description: 'Application is running successfully.',
    })
    health() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
}