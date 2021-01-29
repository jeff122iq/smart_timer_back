import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CardsTags } from './cards-tags.entity';
import { TemplatesTags } from './templates-tags.entity';
import { CategoriesTags } from './categories-tags.entity';

@Entity({ name: 'Tags' })
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany((_) => TemplatesTags, (templatesTags) => templatesTags.tag)
  templatesTags: Array<TemplatesTags>;

  @OneToMany((_) => CategoriesTags, (categoriesTags) => categoriesTags.tag)
  categoriesTags: Array<CategoriesTags>;

  @OneToMany((_) => CardsTags, (categoriesTags) => categoriesTags.tag)
  cardsTags: Array<CardsTags>;
}
