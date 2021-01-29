import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from './../users/users.service';
import { TokenService } from './../token/token.service';
import { LoginUserDTO } from '../helpers/dtos/login-user.dto';
import { IUser } from './../helpers/interfaces/user.interface';
import { CreateUserDTO } from './../helpers/dtos/create-user.dto';
import { ITokenPayload } from './../helpers/interfaces/token-payload.interface';
import { ITokenLoginData } from 'src/helpers/interfaces/token-login-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async register(user: CreateUserDTO) {
    return this.usersService.insert(user);
  }

  async validateUser(loginUser: LoginUserDTO) {
    const user = await this.usersService.findOne(loginUser.email);
    if (user && bcrypt.compareSync(loginUser.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser): Promise<ITokenLoginData> {
    const payload: ITokenPayload = { sub: user.id };
    return this.generateTokens(payload);
  }

  async validateRefreshToken(
    refresh_token_id: string,
  ): Promise<ITokenLoginData> {
    try {
      const token = await this.tokenService.findOneAndDelete(refresh_token_id);
      
      const { sub } = this.jwtService.verify(token.token);
      const payload: ITokenPayload = { sub };
      return this.generateTokens(payload);
    } catch (error) {
      console.log(error.message);

      throw new UnauthorizedException();
    }
  }

  private async generateTokens(
    payload: ITokenPayload,
  ): Promise<ITokenLoginData> {
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '1m' });
    const refresh_token_id = await this.tokenService.insert(
      refresh_token,
      payload.sub,
    );

    return { access_token, refresh_token_id };
  }
}
