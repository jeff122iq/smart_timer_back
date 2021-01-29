import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tags } from '../helpers/entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
})
export class TagsModule {}
