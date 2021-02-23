import { Tags } from './../helpers/entities/tags.entity';
import { TagsService } from './../tags/tags.service';
import { CreateTagDTO } from './../helpers/dtos/create-tag.dto';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CategoriesTags } from 'src/helpers/entities/categories-tags.entity';
import { CreateCategoriesTagsDTO } from 'src/helpers/dtos/create-categories-tags.dto';

@Injectable()
export class CategoriesTagsService {
  constructor(
    @InjectRepository(CategoriesTags)
    private readonly categoriesTagsRepository: Repository<CategoriesTags>,
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
    private readonly connection: Connection,
  ) {}

  async create(createCategoriesTagsDto: CreateCategoriesTagsDTO) {
    let { category, tag: newTag } = createCategoriesTagsDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTagRecord = await this.tagsRepository.insert({
        name: newTag.name,
      });
      const tag = newTagRecord.identifiers[0].id;

      const newRecord = this.categoriesTagsRepository.create({
        category,
        tag,
      });
      const res = await this.categoriesTagsRepository.insert(newRecord);
      const newCategoriesTagsRecord = await this.categoriesTagsRepository.findOne(
        {
          id: res.identifiers[0].id,
        },
      );

      await queryRunner.commitTransaction();
      return newCategoriesTagsRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
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
