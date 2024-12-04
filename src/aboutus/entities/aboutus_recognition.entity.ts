import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recognition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'json', nullable: true })
  thumbnail: { url: string; alt: string; width: number; height: number } | null;

  @Column()
  @Index()
  award_title: string;

  @Column()
  @Index()
  year: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  category: string;

  @Column()
  @Index()
  is_featured: boolean;

  @Column({default: true})
  @Index()
  is_active: boolean;

  @Column('json')
  regions: string[];

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
