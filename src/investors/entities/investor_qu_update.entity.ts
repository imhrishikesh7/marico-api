import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'json', nullable: true })
  investor_qu_pdf: { url: string; alt: string; width: number; height: number} | null;

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
