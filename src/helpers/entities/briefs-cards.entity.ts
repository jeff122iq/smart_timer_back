import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Briefs } from './briefs.entity';
import { Cards } from 'src/helpers/entities/cards.entity';

@Entity({ name: 'BriefsCards' })
export class BriefsCards {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'brief_id' })
  @ManyToOne((_) => Briefs, (briefs) => briefs.briefsCards, {
    primary: true,
    onDelete: 'CASCADE',
  })
  brief: Briefs | number;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne((_) => Cards, (cards) => cards.briefsCards, {
    primary: true,
    onDelete: 'CASCADE',
  })
  card: Cards | number;

  @Column({ nullable: false })
  serial_num: number;
}
