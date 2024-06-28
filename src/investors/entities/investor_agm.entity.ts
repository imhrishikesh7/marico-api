import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InvestorAGM {
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
  agm_documentation_title: string;

  @Column({ type: 'json', nullable: true })
  agm_documentation_pdf: { url: string; alt: string; width: number; height: number} | null;

  @Column('json')
  agm_regions: string[]; 

  @Column()
  @Index()
  investors_agm_category: string;

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
