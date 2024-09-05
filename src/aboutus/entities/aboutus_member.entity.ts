import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class AboutusMember {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Index()
    name: string;
  
    @Column('json')
    type: string[];
  
    @Column()
    @Index()
    position: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column({ type: 'json', nullable: true })
    thumbnail: { url: string; alt: string; width: number; height: number } | null;

    @Column('json')
    regions: string[];
  
    @Column()
    @Index()
    is_active: boolean;
  
    @CreateDateColumn()
    @Index()
    created_at: Date;
  
    @UpdateDateColumn()
    @Index()
    updated_at: Date;
  
  }
  