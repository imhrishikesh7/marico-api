/*
typeorm entity called page
Primary Key: id (int) (auto increment)
additional fields: name (string)
url (string)
page_type (string)
indexed (boolean)
meta_title (string)
meta_description (string)
meta_image (json)
canonical_override (string)
published_at (timestamp)
is_active (boolean)
created_at (timestamp)
updated_at (timestamp)

one to many relationship with page_content entity
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PageContent } from './page_content.entity';

export const PageTypes = ['page'];

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  url: string;

  @Column('enum', {
    enum: PageTypes,
  })
  page_type: string;

  // @Column()
  // indexed: boolean;

  // @Column()
  // meta_title: string;

  // @Column("text")
  // meta_description: string;

  // @Column({ type: "json", nullable: true })
  // meta_image: { url: string; width: number; height: number } | null;

  // @Column()
  // canonical_override: string;

  @Column({
    type: 'timestamp',
  })
  published_at: Date;

  @Column()
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;

  @OneToMany(() => PageContent, page_content => page_content.page)
  page_contents: PageContent[];
}
