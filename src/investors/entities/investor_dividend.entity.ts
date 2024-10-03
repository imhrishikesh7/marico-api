import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvestorDividends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  investors_dividend_category: string;

  @Column()
  @Index()
  investors_dividend_subcategory: string;

  @Column()
  @Index()
  pdf_title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text' })
  pdf: string;

  @Column()
  @Index()
  writeup: string;

  @Column()
  @Index()
  dividends_year: string;

  @Column('json')
  dividend_regions: string[];

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
