import { EditCardDTO } from './../helpers/dtos/edit-card.dto';
import { CreateCardDTO } from './../helpers/dtos/create-card.dto';
import { Cards } from './../helpers/entities/cards.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private readonly cardsRepository: Repository<Cards>,
  ) {}

  async create(createCardDto: CreateCardDTO) {
    try {
      const newCard = this.cardsRepository.create(createCardDto);
      await this.cardsRepository.insert(newCard);
      return HttpStatus.CREATED;
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

  async findAll() {
    return this.cardsRepository.find();
  }

  async edit(editCardDto: EditCardDTO) {
    const { id, description, title } = editCardDto;
    const newValue = this.cardsRepository.create({ description, title });
    await this.cardsRepository.update({ id }, newValue);
    return HttpStatus.OK;
  }

  async delete(id: number) {
    await this.cardsRepository.delete({ id });
    return HttpStatus.OK;
  }
}
