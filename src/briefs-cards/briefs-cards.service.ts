import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { BriefsCards } from './../helpers/entities/briefs-cards.entity';

@Injectable()
export class BriefsCardsService {
  constructor(
    @InjectRepository(BriefsCards)
    private readonly briefsCardsRepository: Repository<BriefsCards>,
  ) {}

  async create(brief: number, card: number, serial_num: number) {
    try {
      const newRecord = this.briefsCardsRepository.create({
        brief,
        card,
        serial_num,
      });
      await this.briefsCardsRepository.insert(newRecord);
      return HttpStatus.CREATED;
    } catch (error) {
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    }
  }

  async edit(id: number, serial_num: number) {
    try {
      await this.briefsCardsRepository.update({ id }, { serial_num });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException('Cannot update data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: number) {
    try {
      await this.briefsCardsRepository.delete(id);
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
