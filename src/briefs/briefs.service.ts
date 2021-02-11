import { BriefsCardsService } from './../briefs-cards/briefs-cards.service';
import { IBrief } from './../helpers/interfaces/brief.interface';
import { BriefsCards } from './../helpers/entities/briefs-cards.entity';
import { Cards } from 'src/helpers/entities/cards.entity';
import { EditBriefDTO } from './../helpers/dtos/edit-brief.dto';
import { CreateBriefDTO } from './../helpers/dtos/create-brief.dto';
import { Briefs } from './../helpers/entities/briefs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Connection, Repository, Transaction } from 'typeorm';

@Injectable()
export class BriefsService {
  constructor(
    @InjectRepository(Briefs)
    private readonly briefsRepository: Repository<Briefs>,
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    @InjectRepository(BriefsCards)
    private readonly briefsCardsRepository: Repository<BriefsCards>,
    private readonly briefsCardsService: BriefsCardsService,
    private readonly connection: Connection,
  ) {}

  async create(createBriefDto: CreateBriefDTO, user: number) {
    const { cards, name } = createBriefDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newBrief = this.briefsRepository.create({ name, user });

      const res = await queryRunner.manager.insert(Briefs, newBrief);
      const brief = res.identifiers[0].id;

      const card_ids: number[] = await Promise.all(
        cards.map(async (card) => {
          if (typeof card === 'number') return card;

          const newCards = this.cardsRepository.create(card);
          const newRecord = await queryRunner.manager.insert(Cards, newCards);
          return newRecord.identifiers[0].id;
        }),
      );
      card_ids.forEach(async (card, serial_num) => {
        const newBriefCard = this.briefsCardsRepository.create({
          card,
          brief,
          serial_num,
        });
        await queryRunner.manager.insert(BriefsCards, newBriefCard);
      });
      await queryRunner.commitTransaction();
      const createdBrief = await this.briefsRepository.findOne(brief);
      return createdBrief;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      switch (error.code) {
        default:
          throw new HttpException(
            'Cannot insert current brief',
            HttpStatus.BAD_REQUEST,
          );
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findByUserId(user: number) {
    return this.briefsRepository.find({ user });
  }

  async findById(id: number) {
    return this.briefsCardsService.findById(id);
  }

  async edit(editBriefDto: EditBriefDTO) {
    const { id, name } = editBriefDto;
    const newValue = this.briefsRepository.create({ name });
    await this.briefsRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }

  async delete(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const brief = await this.briefsCardsService.findById(id);
      const cardsToDelete = brief.cards.filter(
        (card) => card.isMainField === null,
      );
      cardsToDelete.forEach(async (card) => {
        await queryRunner.manager.delete(Cards, { id: card.id });
      });

      await queryRunner.manager.delete(Briefs, { id });
      await queryRunner.commitTransaction();
      return HttpStatus.OK;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
