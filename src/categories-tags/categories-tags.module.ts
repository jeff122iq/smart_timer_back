import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesTagsService } from './categories-tags.service';
import { CategoriesTagsController } from './categories-tags.controller';
import { CategoriesTags } from './../helpers/entities/categories-tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesTags])],
  providers: [CategoriesTagsService],
  controllers: [CategoriesTagsController],
})
export class CategoriesTagsModule {}
