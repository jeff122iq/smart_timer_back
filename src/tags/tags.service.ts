import { CategoriesTagsService } from './../categories-tags/categories-tags.service';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import { Tags } from './../helpers/entities/tags.entity';
import { EditTagDTO } from './../helpers/dtos/edit-tag.dto';
import { CreateTagDTO } from './../helpers/dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    private readonly categoriesTagsService: CategoriesTagsService,
    private readonly connection: Connection,
  ) {}

  async create(createTagDto: CreateTagDTO): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const res = await this.tagsRepository.insert(createTagDto);
      const newTagRecord = await this.tagsRepository.findOne(
        res.identifiers[0].id,
      );
      await queryRunner.commitTransaction();
      return newTagRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      switch (error.code) {
        /** handling duplicate sql error */
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            'This tag already exist',
            HttpStatus.CONFLICT,
          );

        default:
          throw new HttpException(
            'Cannot insert current tag',
            HttpStatus.BAD_REQUEST,
          );
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<any> {
    try {
      return this.tagsRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException('Cannot fetch tags', HttpStatus.BAD_REQUEST);
    }
  }

  async findByCategoryId(id: number) {
    return this.categoriesTagsService.getByCategoryId(id);
  }

  async edit(editTagDto: EditTagDTO) {
    const { id, name } = editTagDto;
    const newValue = this.tagsRepository.create({ name });
    await this.tagsRepository.update({ id }, newValue);
    return await this.tagsRepository.findOne({ id });
  }

  async delete(id: number) {
    await this.tagsRepository.delete({ id });
    return HttpStatus.OK;
  }
}
