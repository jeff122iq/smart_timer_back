import { Cards } from './../helpers/entities/cards.entity';
import { TemplatesCards } from './../helpers/entities/templates-cards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesCardsService {
  constructor(
    @InjectRepository(TemplatesCards)
    private readonly templatesCardsRepository: Repository<TemplatesCards>,
  ) {}

  async findById(id: number) {
    const briefsCards = await this.templatesCardsRepository.find({
      relations: ['card', 'template'],
      where: `template_id = ${id}`,
    });
    const brief = {
      id: (briefsCards[0].template as any).id,
      name: (briefsCards[0].template as any).name,
      cards: briefsCards.map((data) => ({
        id: (data.card as any).id,
        description: (data.card as any).description,
        title: (data.card as any).title,
        isMainField: (data.card as any).isMainField,
        serial_num: data.serial_num,
      })),
    };
    return brief;
  }
}
