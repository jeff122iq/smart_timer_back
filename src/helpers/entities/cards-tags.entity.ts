import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Tags } from './tags.entity';
import { Cards } from 'src/helpers/entities/cards.entity';

@Entity({ name: 'CardsTags' })
export class CardsTags {
  @JoinColumn({ name: 'card_id' })
  @ManyToOne((_) => Cards, (cards) => cards.cardsTags, { primary: true })
  card: Array<Cards> | number;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne((_) => Tags, (tag) => tag.cardsTags, { primary: true })
  tag: Array<Tags> | number;
}
