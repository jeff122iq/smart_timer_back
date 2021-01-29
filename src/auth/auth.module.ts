import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './../users/users.module';
import { TokenModule } from './../token/token.module';
import { Tokens } from '../helpers/entities/tokens.entity';
import { JwtStrategy } from '../helpers/strategies/jwt.strategy';
import { LocalStrategy } from '../helpers/strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tokens]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: { expiresIn: '1y' },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    PassportModule,
    TokenModule
  ],
  providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
