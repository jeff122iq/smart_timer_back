import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { EditTemplateDTO } from './../helpers/dtos/edit-template.dto';
import { Templates } from './../helpers/entities/templates.entity';
import { CreateTemplateDTO } from './../helpers/dtos/create-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Templates)
    private readonly templatesRepository: Repository<Templates>,
  ) {}

  async create(createTemplateDto: CreateTemplateDTO) {
    try {
      const newTemplate = this.templatesRepository.create(createTemplateDto);
      await this.templatesRepository.insert(newTemplate);
      return HttpStatus.CREATED;
    } catch (error) {
      switch (error.code) {
        /** handling duplicate sql error */
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            'This template already exist',
            HttpStatus.CONFLICT,
          );

        default:
          throw new HttpException(
            'Cannot insert current template',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async findAll() {
    return this.templatesRepository.find();
  }

  async delete(id: number) {
    await this.templatesRepository.delete({ id });
    return HttpStatus.OK;
  }

  async edit(editTemplateDto: EditTemplateDTO) {
    const { id, name } = editTemplateDto;
    const newValue = this.templatesRepository.create({ name });
    await this.templatesRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }
}
