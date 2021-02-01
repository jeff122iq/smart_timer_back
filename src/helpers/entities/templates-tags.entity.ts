import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tags } from './tags.entity';
import { Templates } from './templates.entity';

@Entity({ name: 'TemplatesTags' })
export class TemplatesTags {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'template_id' })
  @ManyToOne((_) => Templates, (templates) => templates.templatesTags, {
    primary: true,
  })
  template: Array<Templates> | number;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne((_) => Tags, (tag) => tag.templatesTags, { primary: true })
  tag: Array<Tags> | number;
}
