import { EditCardDTO } from './../helpers/dtos/edit-card.dto';
import {
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDTO } from './../helpers/dtos/create-card.dto';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCardDto: CreateCardDTO) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() editCardDto:EditCardDTO) {
      return this.cardsService.edit(editCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') id: number) {
      return this.cardsService.delete(id)
  }
}
