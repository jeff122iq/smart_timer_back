import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsTags } from 'src/helpers/entities/cards-tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsTagsService {
  constructor(
    @InjectRepository(CardsTags)
    private readonly cardsTagsRepository: Repository<CardsTags>,
  ) {}

  async create(card: number, tag: number) {
    try {
      const newRecord = this.cardsTagsRepository.create({ card, tag });
      await this.cardsTagsRepository.insert(newRecord);
      return HttpStatus.CREATED;
    } catch (error) {
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    }
  }
}
