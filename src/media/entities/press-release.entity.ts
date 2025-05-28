import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('press_release')
export class PressRelease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  media_title: string;

  @Column()
  subtitle?: string;

  @Column({ type: 'json' })
  content: any;

  @Column('simple-array')
  media_regions?: string[];

  @Column()
  release_date?: Date;

  @Column()
  external_link: string;

  @Column('json', { nullable: true })
  kv_image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  } | null;

  @Column('json', { nullable: true })
  pressReleaseFile: {
    url: string;
  } | null;

  @Column('json', { nullable: true })
  annexureFile: {
    url: string;
  } | null;

  @Column()
  sort_order: number;

  @Column()
  is_latest: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 