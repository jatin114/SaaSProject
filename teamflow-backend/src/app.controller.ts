import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CurrentUser } from './common/decorators/current-user.decorator';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@CurrentUser() user: any) {
    return {
      message: 'Access granted',
      user,
    };
  }
}