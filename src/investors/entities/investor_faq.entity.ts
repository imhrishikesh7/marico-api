import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvestorFAQ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  question: string;

  @Column()
  @Index()
  answer: string;

  @Column('json')
  regions: string[];

  @Column()
  @Index()
  sort_order: number;
  
  @Column({ default: true })
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
