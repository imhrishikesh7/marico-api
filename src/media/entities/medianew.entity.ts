import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MediaNew {
  @PrimaryGeneratedColumn()
  id: number;
   
  @Column()
  @Index()
  category: string;

  @Column()
  @Index()
  media_title: string;

  @Column({ nullable: true })
  @Index()
  author: string;

  @Column({ type: 'text', nullable: true })
  publisher_logo: string;
 
  @Column({ type: 'text'  })
  publisher_name: string;

  @Column({ type: 'text' })
  // @Index()
  subtitle: string;

  @Column({ type: 'text' })
  // @Index()
  paragraph?: string |'';

  @Column('json')
  media_regions: string[];

  @Column()
  release_date: Date;

  @Column({ type: 'text' })
  external_link: string;

  @Column({ type: 'json', nullable: true })
  kv_image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  video: {
    url: string;
    // alt: string;
    // width: number;
    // height: number;
  } | null;

  @Column({ type: 'json', nullable: true })
  pressReleaseFile: {
    url: string;
    // alt: string;
    // width: number;
    // height: number;
  } | null;
  @Column({ type: 'json', nullable: true })
  annexureFile: {
    url: string;
    // alt: string;
    // width: number;
    // height: number;
  } | null;

  @Column()
  @Index()
  sort_order: number;

  @Column({ default: true })
  @Index()
  is_latest: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}