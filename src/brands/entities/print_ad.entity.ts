import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PrintAd {
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
  print_ad_title: string;

  @Column('json')
  regions: string[];

  @Column()
  @Index()
  sort_order: number;

  @Column({ type: 'json', nullable: true })
  small_thumbnail: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  large_thumbnail: {
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
