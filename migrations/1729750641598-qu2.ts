import { MigrationInterface, QueryRunner } from "typeorm";

export class Qu21729750641598 implements MigrationInterface {
    name = 'Qu21729750641598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` CHANGE \`region\` \`qu_region\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` CHANGE \`qu_region\` \`region\` json NOT NULL`);
    }

}
