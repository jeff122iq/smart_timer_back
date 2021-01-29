import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      ...configuration().database,
      type: 'mysql',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
