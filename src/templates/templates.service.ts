import { TemplatesCardsService } from './../templates-cards/templates-cards.service';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import { Cards } from './../helpers/entities/cards.entity';
import { Templates } from './../helpers/entities/templates.entity';
import { EditTemplateDTO } from './../helpers/dtos/edit-template.dto';
import { CreateTemplateDTO } from './../helpers/dtos/create-template.dto';
import { TemplatesCards } from './../helpers/entities/templates-cards.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Templates)
    private readonly templatesRepository: Repository<Templates>,
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    @InjectRepository(TemplatesCards)
    private readonly templatesCardsRepository: Repository<TemplatesCards>,
    private readonly templatesCardsService: TemplatesCardsService,
    private readonly connection: Connection,
  ) {}

  async create(createTemplateDto: CreateTemplateDTO) {
    const { cards, name } = createTemplateDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newTemplate = this.templatesRepository.create({ name });
      const res = await queryRunner.manager.insert(Templates, newTemplate);
      const template = res.identifiers[0].id;

      const card_ids: number[] = await Promise.all(
        cards.map(async (card) => {
          if (typeof card === 'number') return card;

          const newCards = this.cardsRepository.create(card);
          const newRecord = await queryRunner.manager.insert(Cards, newCards);
          return newRecord.identifiers[0].id;
        }),
      );
      card_ids.forEach(async (card, serial_num) => {
        const newTemplateCard = this.templatesCardsRepository.create({
          card,
          template,
          serial_num,
        });
        await queryRunner.manager.insert(TemplatesCards, newTemplateCard);
      });

      await queryRunner.commitTransaction();

      return await this.templatesRepository.findOne(template);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      switch (error.code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException(
            `Template with name "${name}" already exist`,
            HttpStatus.CONFLICT,
          );
        default:
          throw new HttpException(
            'Cannot insert current template',
            HttpStatus.BAD_REQUEST,
          );
      }
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.templatesRepository.find();
  }

  async findById(id: number) {
    return this.templatesCardsService.findById(id);
  }

  async delete(id: number) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const brief = await this.templatesCardsService.findById(id);
      const cardsToDelete = brief.cards.filter(
        (card) => card.isMainField === null,
      );
      cardsToDelete.forEach(async (card) => {
        await queryRunner.manager.delete(Cards, { id: card.id });
      });

      await queryRunner.manager.delete(Templates, { id });
      await queryRunner.commitTransaction();
      return HttpStatus.OK;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async edit(editTemplateDto: EditTemplateDTO) {
    const { id, name } = editTemplateDto;
    const newValue = this.templatesRepository.create({ name });
    await this.templatesRepository.update({ id }, newValue);
    return await this.templatesRepository.findOne({ id });
  }
}
