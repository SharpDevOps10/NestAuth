import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Token } from './types';
import { Request } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards';
import { GetCurrentUser } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  logout (@GetCurrentUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens (@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refresh-token']);
  }
}
