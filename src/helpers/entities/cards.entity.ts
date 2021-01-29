import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CardsTags } from './cards-tags.entity';
import { BriefsCards } from './briefs-cards.entity';

@Entity({ name: 'Cards' })
export class Cards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany((_) => CardsTags, (categoriesTags) => categoriesTags.card)
  cardsTags: Array<CardsTags>;

  @OneToMany((_) => BriefsCards, (briefsCards) => briefsCards.card)
  briefsCards: BriefsCards[];
}
