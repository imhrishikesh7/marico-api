import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class InvestorMI {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  mi_documentation_title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text' })
  mi_documentation_pdf: string;

  @Column('json')
  mi_regions: string[];

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
