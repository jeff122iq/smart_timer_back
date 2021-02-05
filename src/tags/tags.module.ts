import { CategoriesTags } from 'src/helpers/entities/categories-tags.entity';
import { CategoriesTagsService } from './../categories-tags/categories-tags.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tags } from '../helpers/entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags, CategoriesTags])],
  providers: [TagsService, CategoriesTagsService],
  controllers: [TagsController],
})
export class TagsModule {}
