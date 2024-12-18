import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class QuartelyUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  investor_qu_id: number;

  @Column()
  @Index()
  investor_qu: string;

  @Column()
  @Index()
  investor_qu_pdf: string;

  @Column()
  @Index()
  title: string;

  @Column({ type: 'text' })
  qu_pdf: string;

  @Column('json')
  qu_region: string[];

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
