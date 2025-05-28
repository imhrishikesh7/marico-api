import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable41727268792476 implements MigrationInterface {
    name = 'EditTable41727268792476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_agm\` DROP COLUMN \`agm_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` ADD \`agm_documentation_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_agm\` DROP COLUMN \`agm_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` ADD \`agm_documentation_pdf\` json NULL`);
    }

}
