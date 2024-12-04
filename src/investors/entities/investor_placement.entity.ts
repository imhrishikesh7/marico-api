import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InvestorPlacement {
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
  documentation_pd_title: string;

  @Column({ type: 'text' })
  pd_documentation_pdf: string;

  @Column('json')
  pd_regions: string[]; 

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
