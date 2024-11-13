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
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  name:string;
 
  @Column()
  @Index()
  phone:string;

  @Column()
  @Index()
  email:string;

  @Column()
  @Index()
  address:string;

  @Column()
  @Index()
  query_type:string;

  @Column()
  @Index()
  query:string;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
