import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Token } from './types';
import { RefreshTokenGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout (@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Post('/refresh')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens (
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
