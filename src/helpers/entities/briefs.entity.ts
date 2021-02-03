import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { BriefsCards } from './briefs-cards.entity';

@Entity({ name: 'Briefs' })
export class Briefs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @ManyToOne((_) => Users, (user) => user.briefs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Array<Users> | number;

  @OneToMany((_) => BriefsCards, (briefsCards) => briefsCards.brief)
  briefsCards: BriefsCards[];
}
