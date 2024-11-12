import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Sitemap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  ref: string;

  @Column()
  @Index()
  ref_id: number;

  @Column()
  @Index()
  meta_title: string;

  @Column()
  meta_description: string;

  @Column()
  @Index()
  canonical_url: string;

  @Column({ type: 'json', nullable: true })
  meta_image: { url: string; width: number; height: number } | null;

  @Column({ type: 'boolean', default: false })
  @Index()
  indexed: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
