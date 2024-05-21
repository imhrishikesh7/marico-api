/*

type orm entity called role
Primary Key: id (int) (auto increment)
additional fields: name (string), permissions (JSON), landing_url (string), is_super_admin, is_active, created_at (timestamp), updated_at (timestamp)
one to many relationship with admin entity
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  permissions: string[];

  @Column()
  landing_url: string;

  @Column({ default: false })
  is_super_admin: boolean;

  @Column({ default: true })
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}
