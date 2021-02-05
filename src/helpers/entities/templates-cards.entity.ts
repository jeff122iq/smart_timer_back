import { Cards } from './cards.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Templates } from './templates.entity';

@Entity({ name: 'TemplatesCards' })
export class TemplatesCards {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'template_id' })
  @ManyToOne((_) => Templates, (templates) => templates.templatesTags, {
    primary: true,
    onDelete: 'CASCADE',
  })
  template: Array<Templates> | number;

  @JoinColumn({ name: 'card_id' })
  @ManyToOne((_) => Cards, (card) => card.templatesCards, {
    primary: true,
    onDelete: 'CASCADE',
  })
  card: Array<Cards> | number;

  @Column({ nullable: false })
  serial_num: number;
}
