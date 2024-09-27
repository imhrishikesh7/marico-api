import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable61727439247811 implements MigrationInterface {
    name = 'EditTable61727439247811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`qu_pdf\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`qu_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`qu_pdf\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`qu_pdf\` json NULL`);
    }

}
