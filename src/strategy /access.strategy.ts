import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  syb: string,
  email: string
};


@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor (config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
    });
  }

  validate (payload: JwtPayload) {
    return payload;
  }
}