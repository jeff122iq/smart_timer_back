import { Controller, Body, Post, UseGuards } from '@nestjs/common';

import { TemplatesTagsService } from './templates-tags.service';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { CreateTemplatesTagsDTO } from './../helpers/dtos/create-templates-tags.dto';

@Controller('templates-tags')
export class TemplatesTagsController {
  constructor(private readonly categoriesTagsService: TemplatesTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBriefsCardsDto: CreateTemplatesTagsDTO) {
    const { template, tag } = createBriefsCardsDto;
    return this.categoriesTagsService.create(template, tag);
  }
}
