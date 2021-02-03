import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { TemplatesTags } from './../helpers/entities/templates-tags.entity';

@Injectable()
export class TemplatesTagsService {
  constructor(
    @InjectRepository(TemplatesTags)
    private readonly templatesTagsRepository: Repository<TemplatesTags>,
  ) {}

  async create(template: number, tag: number) {
    try {
      const newRecord = this.templatesTagsRepository.create({ template, tag });
      const res = await this.templatesTagsRepository.insert(newRecord);
      return await this.templatesTagsRepository.findOne(res.identifiers[0].id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id: number) {
    try {
      await this.templatesTagsRepository.delete(id);
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
