import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity()
export class Tvc {
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
  tvc_title: string;

  @Column()
  @Index()
  tvc_description: string;

  @Column()
  @Index()
  tvc_type: string;

  @Column()
  @Index()
  tvc_code: string;

  @Column('json')
  regions: string[];

  @Column()
  @Index()
  sort_order: number;

  @Column({ type: 'json', nullable: true })
  thumbnail: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
