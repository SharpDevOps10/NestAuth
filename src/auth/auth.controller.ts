import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Token } from './types';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Post('/local/signup')
  signupLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signupLocal(dto);
  }

  @Post('/local/signin')
  signinLocal (@Body() dto: AuthDTO): Promise<Token> {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  logout () {
    this.authService.logout();
  }

  @Post('/refresh')
  refreshTokens () {
    this.authService.refreshTokens();
  }
}
