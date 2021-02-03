import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

import { Tags } from './../helpers/entities/tags.entity';
import { EditTagDTO } from './../helpers/dtos/edit-tag.dto';
import { CreateTagDTO } from './../helpers/dtos/create-tag.dto';
import { IAutoFilling } from './../helpers/interfaces/auto-filling.interface';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
  ) {}

  async create(createTagDto: CreateTagDTO): Promise<any> {
    try {
      const res = await this.tagsRepository.insert(createTagDto);
      const newRecord = await this.tagsRepository.findOne(
        res.identifiers[0].id,
      );

      return newRecord;
    } catch (error) {
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

  async findAutoFilling(params: IAutoFilling) {
    const { startWith, notInclude } = params;
    const query = `
      SELECT name FROM tags
      WHERE name LIKE CONCAT("${startWith}","\%")
        AND name NOT IN (${notInclude});
    `;
    return await this.tagsRepository.query(query);
  }

  async edit(editTagDto: EditTagDTO) {
    const { id, name } = editTagDto;
    const newValue = this.tagsRepository.create({ name });
    await this.tagsRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }

  async delete(id: number) {
    await this.tagsRepository.delete({ id });
    return HttpStatus.OK;
  }
}
