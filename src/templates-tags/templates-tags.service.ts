import { TemplatesTags } from './../helpers/entities/templates-tags.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesTagsService {
  constructor(
    @InjectRepository(TemplatesTags)
    private readonly templatesTagsRepository: Repository<TemplatesTags>,
  ) {}

  async create(template: number, tag: number) {
    try {
      const newRecord = this.templatesTagsRepository.create({ template, tag });
      await this.templatesTagsRepository.insert(newRecord);
      return HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
    }
  }
}
