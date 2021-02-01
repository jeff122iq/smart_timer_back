import { EditBriefDTO } from './../helpers/dtos/edit-brief.dto';
import { CreateBriefDTO } from './../helpers/dtos/create-brief.dto';
import { Briefs } from './../helpers/entities/briefs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BriefsService {
  constructor(
    @InjectRepository(Briefs)
    private readonly briefsRepository: Repository<Briefs>,
  ) {}

  async create(createBriefDto: CreateBriefDTO) {
    try {
      const newCard = this.briefsRepository.create(createBriefDto);
      await this.briefsRepository.insert(newCard);
      return HttpStatus.CREATED;
    } catch (error) {
      switch (error.code) {
        case 'ER_NO_REFERENCED_ROW_2':
          throw new HttpException(
            "Current user doesn't exist",
            HttpStatus.BAD_REQUEST,
          );
        default:
          throw new HttpException(
            'Cannot insert current brief',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async findAll() {
    return this.briefsRepository.find();
  }

  async edit(editBriefDto: EditBriefDTO) {
    const { id, name } = editBriefDto;
    const newValue = this.briefsRepository.create({ name });
    await this.briefsRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }

  async delete(id: number) {
    await this.briefsRepository.delete({ id });
    return HttpStatus.OK;
  }
}
