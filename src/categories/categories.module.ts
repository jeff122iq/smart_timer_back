import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from '../helpers/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
