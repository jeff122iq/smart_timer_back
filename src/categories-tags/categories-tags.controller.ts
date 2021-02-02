import { Controller, UseGuards, Post, Body } from '@nestjs/common';

import { CategoriesTagsService } from './categories-tags.service';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { CreateCategoriesTagsDTO } from './../helpers/dtos/create-categories-tags.dto';

@Controller('categories-tags')
export class CategoriesTagsController {
  constructor(private readonly categoriesTagsService: CategoriesTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBriefsCardsDto: CreateCategoriesTagsDTO) {
    const { category, tag } = createBriefsCardsDto;
    return this.categoriesTagsService.create(category, tag);
  }
}
