import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvestorDR {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  dr_documentation_year: string ;

  @Column()
  @Index()
  dr_documentation_title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text' })
  dr_documentation_pdf: string;

  @Column('json')
  dr_regions: string[];

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
