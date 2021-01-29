import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Delete,
  Query,
  Put,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { Role } from 'src/helpers/decorators/role.decorator';
import { JwtAuthGuard } from './../helpers/guards/jwt-auth.guard';
import { EditCategoryDTO } from './../helpers/dtos/edit-category.dto';
import { CreateCategoryDTO } from './../helpers/dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Role('admin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Delete()
  async delete(@Query('id') id: number) {
    return this.categoryService.delete(id);
  }

  @Put()
  async edit(@Body() editCategoryDto: EditCategoryDTO) {
    return this.categoryService.edit(editCategoryDto);
  }
}
