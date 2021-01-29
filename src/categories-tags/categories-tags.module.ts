import { CategoriesTags } from './../helpers/entities/categories-tags.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesTagsService } from './categories-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesTags])],
  providers: [CategoriesTagsService],
})
export class CategoriesTagsModule {}
