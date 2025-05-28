/*

typeorm entity to store admin activity
Primary Key: id (int) (auto increment)
additional fields: admin_id (int), activity_type (string), activity_ref (string), activity (string), data (json object), created_at (timestamp), updated_at (timestamp)

many to one relationship with admin entity

*/

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
import { Admin } from './admin.entity';

@Entity()
export class AdminActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  admin_id: number;

  @Column()
  @Index()
  activity_type: string;

  @Column()
  @Index()
  activity_ref: string;

  @Column()
  activity: string;

  @Column({
    type: 'json',
  })
  data: object;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Admin, admin => admin.admin_activities)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;
}
