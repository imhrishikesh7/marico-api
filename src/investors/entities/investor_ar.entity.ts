import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvestorAR {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  ar_documentation_year: string;

  @Column()
  @Index()
  ar_documentation_title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text' })
  ar_documentation_pdf: string;

  @Column('json')
  ar_regions: string[];

  @Column()
  @Index()
  investors_ar_category: string;

  @Column()
  @Index()
  sort_order: number;

  @Column()
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
