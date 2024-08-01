import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pages {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Index()
    name: string;

    @Column()
    @Index()
    url: string;

    @Column({ default: true })
    @Index()
    is_active: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
