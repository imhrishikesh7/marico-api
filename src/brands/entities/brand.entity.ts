import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tvc } from './tvc.entity';

@Entity()
export class Brand {
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
  brand_title: string;

  @Column()
  @Index()
  brand_url_title: string;

  @Column()
  @Index()
  brand_type: string;

  @Column({ type: 'text' })
  short_text: string;

  @Column({ type: 'text' })
  overview: string;

  @Column('json')
  tvc_relation: string[];

  @Column('json')
  print_ad_relation: string[];

  @Column('json')
  award_relation: string[];

  @Column('json')
  sub_brand_relation: string[];

  @Column()
  @Index()
  is_featured: boolean;

  @Column({ type: 'json', nullable: true })
  thumbnail1: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  thumbnail2: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  thumbnail3: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  thumbnail4: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column('json')
  regions: string[];

  @Column()
  @Index()
  sort_order: number;

  @Column()
  @Index()
  shop_now_url: string;
  
  @Column()
  @Index()
  show_in_front: boolean;

  @Column()
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
