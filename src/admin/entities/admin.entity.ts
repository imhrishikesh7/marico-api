/*

type orm entity called admin
Primary Key: id (int) (auto increment)
additional fields: unique_id (string), name (string), email (encrypted with key), password (encrypted with key), is_active (boolean), created_at (timestamp), updated_at (timestamp)

many to one relationship with role entity
one to many relationship with admin_activity entity
*/

import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CryptoService } from '../../lib/utility';
import { Role } from './role.entity';
import { AdminActivity } from './admin_activity.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Index()
  unique_id: string;

  @Column()
  name: string;

  @Column({
    type: 'varbinary',
    length: 255,
    transformer: {
      to: (value: string) => CryptoService.encrypt(value),
      from: (value: string) => CryptoService.decrypt(value.toString()),
    },
  })
  @Index()
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => CryptoService.hashPassword(value),
      from: (value: string) => value,
    },
  })
  @Index()
  password: string;

  @Column()
  @Index()
  is_active: boolean;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;

  @Column('int')
  @Index()
  role_id: number;

  @ManyToOne(() => Role, role => role.admins)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => AdminActivity, admin_activity => admin_activity.admin)
  admin_activities: AdminActivity[];
}
