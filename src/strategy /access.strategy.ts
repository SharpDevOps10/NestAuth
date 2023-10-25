import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  syb: string,
  email: string
};


@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at-secret',
    });
  }

  validate (payload: JwtPayload) {
    return payload;
  }
}