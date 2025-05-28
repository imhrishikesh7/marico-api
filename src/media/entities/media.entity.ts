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

  @Column()
  release_date: Date;

  @Column({ type: 'text' })
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

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity('media')
// export class Media {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'enum', enum: ['press', 'spotlight'] })
//   category: 'press' | 'spotlight';

//   @Column()
//   title: string;

//   @Column({ nullable: true })
//   author?: string;

//   @Column({ nullable: true })
//   publisher_logo?: string;

//   @Column({ nullable: true })
//   publisher_name?: string;

//   @Column({ nullable: true })
//   subtitle?: string;

//   @Column({ type: 'date' })
//   date: Date;

//   @Column({ nullable: true })
//   image?: string;

//   @Column({ nullable: true })
//   video?: string;

//   @Column({ nullable: true })
//   pressReleaseFile?: string;

//   @Column({ nullable: true })
//   annexureFile?: string;

//   @Column({ type: 'simple-array', nullable: true })
//   slider?: string[];

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }
