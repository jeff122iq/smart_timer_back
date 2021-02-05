import { Cards } from 'src/helpers/entities/cards.entity';
import { Briefs } from './../helpers/entities/briefs.entity';
import { IBrief } from './../helpers/interfaces/brief.interface';
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
      const res = await this.briefsCardsRepository.insert(newRecord);
      return await this.briefsCardsRepository.findOne(res.identifiers[0].id);
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

  async findById(id: number) {
    const briefsCards = await this.briefsCardsRepository.find({
      relations: ['card', 'brief'],
      where: `brief_id = ${id}`,
    });
    const brief: IBrief = {
      id: (briefsCards[0].brief as Briefs).id,
      name: (briefsCards[0].brief as Briefs).name,
      cards: briefsCards.map((data) => ({
        id: (data.card as Cards).id,
        description: (data.card as Cards).description,
        title: (data.card as Cards).title,
        isMainField: (data.card as Cards).isMainField,
        serial_num: data.serial_num,
      })),
    };
    return brief;
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
