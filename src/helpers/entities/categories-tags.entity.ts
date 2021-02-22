import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tags } from './tags.entity';
import { Categories } from './categories.entity';

@Entity({ name: 'CategoriesTags' })
export class CategoriesTags {
  @PrimaryGeneratedColumn()
  id: number;
  
  @JoinColumn({ name: 'category_id' })
  @ManyToOne((_) => Categories, (categories) => categories.categoriesTags, {
    primary: true,
    onDelete: 'CASCADE',
  })
  category: Array<Categories> | number;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne((_) => Tags, (tag) => tag.categoriesTags, {
    primary: true,
    onDelete: 'CASCADE',
  })
  tag: Array<Tags> | number;
}
