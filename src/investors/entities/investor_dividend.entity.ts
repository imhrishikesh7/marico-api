import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InvestorDividends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'json', nullable: true })
  dividend_history: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'text' })
  history_writeup: string;

  @Column({ type: 'json', nullable: true })
  unclaimed_interim_dividends: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'text' })
  unclaimed_interim_dividends_writeup: string;

  @Column()
  @Index()
  unclaimed_interim_dividends_year: string;

  @Column({ type: 'json', nullable: true })
  unclaimed_dividends: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'text' })
  unclaimed_dividends_writeup: string;

  @Column()
  @Index()
  unclaimed_dividends_year: string;

  @Column({ type: 'json', nullable: true })
  transfer_shares_to_IEPF: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'text' })
  transfer_shares_to_IEPF_writeup: string;

  @Column()
  @Index()
  transfer_shares_to_IEPF_year: string;

  @Column({ type: 'json', nullable: true })
  forms_pdf: { url: string; alt: string; width: number; height: number } | null;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
