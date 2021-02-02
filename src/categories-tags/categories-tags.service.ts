import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CategoriesTags } from 'src/helpers/entities/categories-tags.entity';

@Injectable()
export class CategoriesTagsService {
  constructor(
    @InjectRepository(CategoriesTags)
    private readonly categoriesTagsRepository: Repository<CategoriesTags>,
  ) {}

  async create(category: number, tag: number) {
    try {
      const newRecord = this.categoriesTagsRepository.create({ category, tag });
      await this.categoriesTagsRepository.insert(newRecord);
      return HttpStatus.CREATED;
    } catch (error) {
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: number) {
    try {
      await this.categoriesTagsRepository.delete(id);
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
