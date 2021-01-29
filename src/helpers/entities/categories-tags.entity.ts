import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Tags } from './tags.entity';
import { Categories } from './categories.entity';

@Entity({ name: 'CategoriesTags' })
export class CategoriesTags {
  @JoinColumn({ name: 'category_id' })
  @ManyToOne((_) => Categories, (categories) => categories.categoriesTags, {
    primary: true,
  })
  category: Array<Categories> | number;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne((_) => Tags, (tag) => tag.categoriesTags, { primary: true })
  tag: Array<Tags> | number;
}
