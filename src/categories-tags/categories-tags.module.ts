import { TagsService } from './../tags/tags.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesTagsService } from './categories-tags.service';
import { CategoriesTagsController } from './categories-tags.controller';
import { CategoriesTags } from './../helpers/entities/categories-tags.entity';
import { Tags } from 'src/helpers/entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesTags, Tags])],
  providers: [CategoriesTagsService, TagsService],
  controllers: [CategoriesTagsController],
})
export class CategoriesTagsModule {}
