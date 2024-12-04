import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InvestorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text' })
  schedule_analyst_meet_pdf: string;
  
  @Column()
  @Index()
  schedule_analyst_meet_year: string;

  @Column('json')
  region: string[]

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
