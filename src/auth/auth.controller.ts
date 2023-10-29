import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Token } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

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
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  logout (@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  refreshTokens (@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refresh-token']);
  }
}
