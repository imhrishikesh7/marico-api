import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InvestorShareHolder {
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
  investors_shi_title: string;

  @Column({ type: 'text'})
  investors_shi_pdf: string;

  @Column('json')
  regions: string[]; 

  @Column()
  @Index()
  investors_shi_year: string;

  @Column()
  @Index()
  investors_shi_category: string;

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
