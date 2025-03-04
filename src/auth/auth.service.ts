import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,    private jwtService: JwtService
  ) {}

   async validateUser(username: string, pass: string): Promise<any> {
    //decrypt password
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return result;
  }

  async generateTokens(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, { secret: jwtConstants.secret, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: jwtConstants.refreshSecret, expiresIn: '7d' });

    // บันทึก Refresh Token ลงฐานข้อมูล (ในที่นี้เป็น mock)
    await this.usersService.updateRefreshToken(user.userId, refreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async login(user: any) {
    const resule = await this.validateUser(user.username, user.password);
    if (!resule) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, { secret: jwtConstants.refreshSecret });
      const user = await this.usersService.findById(payload.sub);
  
      if (!user || user.refreshToken !== token) {
        throw new UnauthorizedException('Invalid refresh token');
      }
  
      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
