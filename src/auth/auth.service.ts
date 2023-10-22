import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor (
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signupLocal (dto: AuthDTO): Promise<Token> {
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash: await this.hashData(dto.password),
      },
    });

    return await this.getTokens(user.id, user.email);
  }

  private hashData (data: string) {
    return bcrypt.hash(data, 10);
  }
  
  private async getTokens (userId: number, email: string) {
    const accessTokenExpires = 60 * 15;
    const refreshTokenExpires = 60 * 60 * 24 * 7;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: accessTokenExpires,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: refreshTokenExpires,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  signinLocal () {}

  logout () {}

  refreshTokens () {}

}
