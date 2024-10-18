import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TitleCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  menu: string;

  @Column()
  @Index()
  sub_menu: string;

  @Column()
  @Index()
  category_title: string;

  @Column({default: true })
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
