import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Briefs } from './briefs.entity';
import { Cards } from 'src/helpers/entities/cards.entity';

@Entity({ name: 'BriefsCards' })
export class BriefsCards {
  @JoinColumn({ name: 'brief_id' })
  @ManyToOne((_) => Briefs, (briefs) => briefs.briefsCards, { primary: true })
  brief: Briefs;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne((_) => Cards, (cards) => cards.briefsCards, { primary: true })
  card: Cards;

  @Column({ nullable: false })
  serial_num: number;
}
