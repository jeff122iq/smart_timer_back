import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tokens } from '../helpers/entities/tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
})
export class TokenModule {}
