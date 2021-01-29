import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categories } from '../helpers/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
})
export class CategoriesModule {}
