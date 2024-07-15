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

  @Column({ type: 'json', nullable: true })
  schedule_analyst_meet_pdf: { url: string; alt: string; width: number; height: number} | null;
  
  @Column()
  @Index()
  schedule_analyst_meet_year: string;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
