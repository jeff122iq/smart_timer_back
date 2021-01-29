import { CategoriesTags } from './categories-tags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Categories' })
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 50, unique: true, nullable: false })
  name: string;

  @OneToMany(
    _ => CategoriesTags,
    categoriesTags => categoriesTags.category,
  )
  categoriesTags: Array<CategoriesTags>;
}
