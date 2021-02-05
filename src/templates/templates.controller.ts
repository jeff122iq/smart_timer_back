import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Delete,
  Query,
  Put,
  Param,
} from '@nestjs/common';

import { EditTemplateDTO } from './../helpers/dtos/edit-template.dto';
import { TemplatesService } from './templates.service';
import { CreateTemplateDTO } from './../helpers/dtos/create-template.dto';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTemplateDto: CreateTemplateDTO) {
    return this.templatesService.create(createTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.templatesService.findAll();
  }

  @Get(":id")
  async findById(@Param('id') id: number) {
    return this.templatesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') id: number) {
    return this.templatesService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() editTemplateDto: EditTemplateDTO) {
    return this.templatesService.edit(editTemplateDto);
  }
}
