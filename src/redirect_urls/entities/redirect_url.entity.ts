import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RedirectUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  from_url: string;

  @Column({ type: 'text' })
  to_url: string;

  @Column({ default: true })
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
