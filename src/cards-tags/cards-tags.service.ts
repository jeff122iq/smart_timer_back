import { Repository, In, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CardsTags } from 'src/helpers/entities/cards-tags.entity';

@Injectable()
export class CardsTagsService {
  constructor(
    @InjectRepository(CardsTags)
    private readonly cardsTagsRepository: Repository<CardsTags>,
    private readonly connection: Connection,
  ) {}

  async create(card: number, tag: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newRecord = this.cardsTagsRepository.create({ card, tag });
      const res = await this.cardsTagsRepository.insert(newRecord);
      const newCardsTagsRecord = await this.cardsTagsRepository.findOne({
        id: res.identifiers[0].id,
      });
      await queryRunner.commitTransaction();
      return newCardsTagsRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Cannot insert data', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
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
