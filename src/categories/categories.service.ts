import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Categories } from './../helpers/entities/categories.entity';
import { EditCategoryDTO } from './../helpers/dtos/edit-category.dto';
import { CreateCategoryDTO } from './../helpers/dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async create(createCategotyDto: CreateCategoryDTO) {
    try {
      const newCategory = this.categoryRepository.create(createCategotyDto);
      const res = await this.categoryRepository.insert(newCategory);
      return await this.categoryRepository.findOne(res.identifiers[0].id);
    } catch (error) {
      switch (error.code) {
        /** handling duplicate sql error */
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            'This category already exist',
            HttpStatus.CONFLICT,
          );

        default:
          throw new HttpException(
            'Cannot insert current category',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async findAll() {
    return this.categoryRepository.find();
  }

  async delete(id: number) {
    return this.categoryRepository.delete({ id });
  }

  async edit(editCategoryDTO: EditCategoryDTO) {
    const { id, name } = editCategoryDTO;
    const newValue = this.categoryRepository.create({ name });
    await this.categoryRepository.update({ id }, newValue);
    return await this.categoryRepository.findOne({ id });
  }
}
