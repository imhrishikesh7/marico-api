import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PageContent {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Index()
    page_ref_id: number;

    @Column()
    @Index()
    page_ref: string;

    @Column()
    @Index()
    content: {};

    @Column({ default: true })
    @Index()
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
