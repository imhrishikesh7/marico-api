/*
typeorm entity called page_content
Primary Key: id (int) (auto increment)
additional fields:
page_id (int)
component_type (string) (enum)
content (json)
order (int)
is_active (boolean)
created_at (timestamp)
updated_at (timestamp)

Relationships:
many to one relationship with page entity
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
  } from "typeorm";
  import { Page } from "./page.entity";
  
  @Entity()
  export class PageContent {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Index()
    page_id: number;
  
    @Column()
    @Index()
    reference_name: string;
  
    @Column()
    component_type: string;
  
    @Column({ type: "json", nullable: true })
    content: object | null;
  
    @Column()
    order: number;
  
    @Column()
    @Index()
    is_active: boolean;
  
    @CreateDateColumn()
    @Index()
    created_at: Date;
  
    @UpdateDateColumn()
    @Index()
    updated_at: Date;
  
    @ManyToOne(() => Page, page => page.page_contents)
    @JoinColumn({ name: "page_id" })
    page: Page;
  }
  