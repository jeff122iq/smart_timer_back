import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TemplatesTags } from './templates-tags.entity';

@Entity({ name: 'Templates' })
export class Templates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100, unique: true, nullable: false })
  name: string;

  @OneToMany((_) => TemplatesTags, (templatesTags) => templatesTags.template)
  templatesTags: Array<TemplatesTags>;
}
