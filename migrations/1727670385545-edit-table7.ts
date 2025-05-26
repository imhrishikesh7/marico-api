import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable71727670385545 implements MigrationInterface {
    name = 'EditTable71727670385545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`qu_pdf\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`qu_pdf\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_psi\` DROP COLUMN \`psi_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_psi\` ADD \`psi_documentation_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_psi\` DROP COLUMN \`psi_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_psi\` ADD \`psi_documentation_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`qu_pdf\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`qu_pdf\` json NULL`);
    }

}
