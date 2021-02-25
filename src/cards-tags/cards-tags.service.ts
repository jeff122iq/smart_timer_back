import { Cards } from './../helpers/entities/cards.entity';
import { CreateCardsTagsDTO } from './../helpers/dtos/create-cards-tags.dto';
import { Repository, In, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { CardsTags } from 'src/helpers/entities/cards-tags.entity';

@Injectable()
export class CardsTagsService {
  constructor(
    @InjectRepository(CardsTags)
    private readonly cardsTagsRepository: Repository<CardsTags>,
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    private readonly connection: Connection,
  ) {}

  async create(createCardsTagsDto: CreateCardsTagsDTO) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const insertedCardResult = await this.cardsRepository.insert(
        createCardsTagsDto.card,
      );
      const card = insertedCardResult.identifiers[0].id;
      const { tag } = createCardsTagsDto;
      const newRecord = this.cardsTagsRepository.create({ card, tag });
      const res = await this.cardsTagsRepository.insert(newRecord);
      const newCardsTagsRecord = await this.cardsTagsRepository.findOne(
        { id: res.identifiers[0].id },
        { relations: ['card'] },
      );
      await queryRunner.commitTransaction();
      return newCardsTagsRecord.card;
    } catch (error) {
      console.log(error);

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
