import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tags } from './tags.entity';
import { Cards } from 'src/helpers/entities/cards.entity';

@Entity({ name: 'CardsTags' })
export class CardsTags {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne((_) => Cards, (cards) => cards.cardsTags, {
    primary: true,
    onDelete: 'CASCADE',
  })
  card: Array<Cards> | number;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne((_) => Tags, (tag) => tag.cardsTags, {
    primary: true,
    onDelete: 'CASCADE',
  })
  tag: Array<Tags> | number;
}
