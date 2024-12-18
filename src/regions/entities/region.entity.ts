/*
region master entity
Columms:
id: number (primary key) (autoincrement)
name: string (index)
thumbnail: { url: string; alt: string; width: number; height: number }
is_active: boolean (index)
created_at: date
updated_at: date
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

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  alias: string;

  @Column({ type: 'json', nullable: true })
  thumbnail: { url: string; alt: string; width: number; height: number } | null;

  @Column({ default: true })
  @Index()
  is_active: boolean;

  @Column()
  @Index()
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
