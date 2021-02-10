import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CardsTags } from 'src/helpers/entities/cards-tags.entity';

@Injectable()
export class CardsTagsService {
  constructor(
    @InjectRepository(CardsTags)
    private readonly cardsTagsRepository: Repository<CardsTags>,
  ) {}

  async create(card: number, tag: number) {
    try {
      const newRecord = this.cardsTagsRepository.create({ card, tag });
      const res = await this.cardsTagsRepository.insert(newRecord);
      return await this.cardsTagsRepository.findOne(res.identifiers[0].id);
    } catch (error) {
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: number) {
    try {
      await this.cardsTagsRepository.delete(id);
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByTagsId(tags: number[]) {
    return await this.cardsTagsRepository.find({
      where: { tag: In(tags) },
      relations: ['card', 'tag'],
    });
  }
}
