import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string; // user id
  email: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'changeme',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    // what you return here becomes req.user
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}

