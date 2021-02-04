import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { BriefsCardsService } from './briefs-cards.service';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { CreateBriefsCardsDTO } from './../helpers/dtos/create-briefs-cards.dto';
import { EditBriefsCardsDTO } from '../helpers/dtos/edit-briefs-cards.dto';

@Controller('briefs-cards')
export class BriefsCardsController {
  constructor(private readonly briefsCardsService: BriefsCardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBriefsCardsDto: CreateBriefsCardsDTO) {
    const { brief, card, serial_num } = createBriefsCardsDto;
    return this.briefsCardsService.create(brief, card, serial_num);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() createBriefsCardsDto: EditBriefsCardsDTO) {
    const { id, serial_num } = createBriefsCardsDto;
    return this.briefsCardsService.edit(id, serial_num);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') id: number) {
    return this.briefsCardsService.deleteById(id);
  }
}
