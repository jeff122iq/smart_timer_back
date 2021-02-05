import { TemplatesCards } from './templates-cards.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'Templates' })
export class Templates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100, unique: true, nullable: false })
  name: string;

  @OneToMany((_) => TemplatesCards, (templatesTags) => templatesTags.template)
  templatesTags: Array<TemplatesCards>;
}
