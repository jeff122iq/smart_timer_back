import { Controller, UseGuards, Post, Body } from '@nestjs/common';

import { CardsTagsService } from './cards-tags.service';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { CreateCardsTagsDTO } from './../helpers/dtos/create-cards-tags.dto';

@Controller('cards-tags')
export class CardsTagsController {
  constructor(private readonly cardsTagsService: CardsTagsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBriefsCardsDto: CreateCardsTagsDTO) {
    return this.cardsTagsService.create(createBriefsCardsDto);
  }
}
