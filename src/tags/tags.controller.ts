import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Put,
  Delete,
  Param,
} from '@nestjs/common';

import { TagsService } from './tags.service';
import { EditTagDTO } from './../helpers/dtos/edit-tag.dto';
import { Role } from './../helpers/decorators/role.decorator';
import { CreateTagDTO } from './../helpers/dtos/create-tag.dto';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { IAutoFilling } from './../helpers/interfaces/auto-filling.interface';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Role('admin')
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() createTagDto: CreateTagDTO) {
    return this.tagsService.create(createTagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll() {
    return this.tagsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findByCategoryId(@Param('id') id: number) {
    return this.tagsService.findByCategoryId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async edit(@Body() editTagDto: EditTagDTO) {
    return this.tagsService.edit(editTagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Query('id') id: number) {
    return this.tagsService.delete(id);
  }
}
