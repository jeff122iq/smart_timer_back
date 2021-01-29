import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Briefs } from '../helpers/entities/briefs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Briefs])],
})
export class BriefsModule {}
