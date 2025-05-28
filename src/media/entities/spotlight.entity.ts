import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spotlight')
export class Spotlight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  media_title: string;

  @Column()
  author: string;

  @Column()
  publisher_logo: string;

  @Column()
  publisher_name: string;

  @Column()
  subtitle: string;

  @Column('simple-array')
  media_regions: string[];

  @Column()
  release_date: Date;

  @Column()
  external_link: string;

  @Column('json', { nullable: true })
  kv_image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  } | null;

  @Column('json', { nullable: true })
  video: {
    url: string;
  } | null;

  @Column()
  sort_order: number;

  @Column()
  is_latest: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 