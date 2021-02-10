import { CardsTagsService } from './../cards-tags/cards-tags.service';
import { EditCardDTO } from './../helpers/dtos/edit-card.dto';
import { CreateCardDTO } from './../helpers/dtos/create-card.dto';
import { Cards } from './../helpers/entities/cards.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
    private readonly cardsTagsService: CardsTagsService,
  ) {}

  async create(createCardDto: CreateCardDTO) {
    try {
      const newCard = this.cardsRepository.create(createCardDto);
      const res = await this.cardsRepository.insert(newCard);
      return await this.cardsRepository.findOne(res.identifiers[0].id);
    } catch (error) {
      switch (error.code) {
        default:
          throw new HttpException(
            'Cannot insert current card',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  async findAllByTagsId(tags: number[]) {
    const cardsTags = await this.cardsTagsService.findAllByTagsId(tags);
    return cardsTags.map((ct) => ({
      ...(ct.card as object),
      tag: (ct.tag as any).id,
    }));
  }

  async edit(editCardDto: EditCardDTO) {
    const { id, description, title, isMainField } = editCardDto;
    const newValue = this.cardsRepository.create({
      description,
      title,
      isMainField,
    });
    await this.cardsRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }

  async delete(id: number) {
    await this.cardsRepository.delete({ id });
    return HttpStatus.OK;
  }
}
