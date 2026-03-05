import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req: any) {
    return {
      message: 'Access granted',
      user: req.user,
    };
  }
}