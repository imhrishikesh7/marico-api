import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  category: string;

  @Column()
  @Index()
  media_title: string;

  @Column()
  @Index()
  url_title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  media_pdf: string;

  @Column()
  @Index()
  year: string;

  @Column('json')
  media_regions: string[];

  @Column({
    type: "timestamp",
  })
  release_date: Date;

  @Column({ type: 'text', nullable: true })
  external_link: string;

  @Column({ type: 'json', nullable: true })
  small_image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  thumbnail: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  marico_img: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column()
  @Index()
  sort_order: number;

  @Column({default: true})
  @Index()
  is_latest: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
