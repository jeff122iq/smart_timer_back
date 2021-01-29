import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../helpers/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
