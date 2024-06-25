import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'json', nullable: true })
  thumbnail: { url: string; alt: string; width: number; height: number } | null;
  
  @Column()
  @Index()
  history_title: string;

  @Column()
  @Index()
  year: number;

  @Column({ type: 'text' })
  description: string;

  @Column('json')
  regions: string[];

  @Column()
  @Index()
  sort_order: number;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
