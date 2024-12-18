import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CorporateGovernance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  @Index()
  url_title: string;

  @Column()
  @Index()
  documentation_cg_title: string;

  @Column({ type: 'text' })
  documentation_cg_pdf: string;

  @Column()
  @Index()
  documentation_cg_category: string;

  @Column('json')
  cg_regions: string[];

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
