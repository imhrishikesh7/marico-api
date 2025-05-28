import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Status {
    PENDING = 'PENDING',
    DENIED = 'DENIED',
    APPROVED = 'APPROVED'
}

@Entity()
export class ApprovalRequest {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('varchar', { length: 255 })
    email: string;

    @Column('varchar', { length: 255 })
    name: string;

    @Column('varchar', { length: 255 })
    company: string;

    @Column('varchar', { length: 255 })
    phone: string;

    @Column('varchar', { length: 255 })
    purpose: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING
    })
    status: Status;
}

