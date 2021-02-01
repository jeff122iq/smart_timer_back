import { EditBriefDTO } from './../helpers/dtos/edit-brief.dto';
import { CreateBriefDTO } from './../helpers/dtos/create-brief.dto';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BriefsService } from './briefs.service';

@Controller('briefs')
export class BriefsController {
  constructor(private readonly briefsService: BriefsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBriefDto: CreateBriefDTO) {
    return this.briefsService.create(createBriefDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.briefsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() editBriefDto: EditBriefDTO) {
    return this.briefsService.edit(editBriefDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') id: number) {
    return this.briefsService.delete(id);
  }
}
