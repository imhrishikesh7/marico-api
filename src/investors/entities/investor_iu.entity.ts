import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class InformationUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;

  @Column()
  @Index()
  url_title: string;

  @Column()
  @Index()
  documentation_iu_title: string;

  @Column({ type: 'text' })
  iu_documentation_pdf: string;

  @Column('json')
  iu_regions: string[]; 

  @Column()
  @Index()
  sort_order: number;

  @CreateDateColumn()
  @Index()
  created_at: Date;

  @UpdateDateColumn()
  @Index()
  updated_at: Date;
}
