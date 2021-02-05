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
      const res = await this.categoriesTagsRepository.insert(newRecord);
      return await this.categoriesTagsRepository.findOne(res.identifiers[0].id);
    } catch (error) {
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    }
  }

  async getByCategoryId(id: number) {
    const res = await this.categoriesTagsRepository.find({
      where: `category_id = ${id}`,
      relations: ['tag'],
    });

    return res.reduce((prev, curr) => {
      prev.push({ id: (curr.tag as any).id, name: (curr.tag as any).name });
      return prev;
    }, []);
  }
}
