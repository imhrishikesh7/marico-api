import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable81727694228359 implements MigrationInterface {
    name = 'EditTable81727694228359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_placement\` DROP COLUMN \`pd_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_placement\` ADD \`pd_documentation_pdf\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`information_update\` DROP COLUMN \`iu_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`information_update\` ADD \`iu_documentation_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`information_update\` DROP COLUMN \`iu_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`information_update\` ADD \`iu_documentation_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_placement\` DROP COLUMN \`pd_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_placement\` ADD \`pd_documentation_pdf\` json NULL`);
    }

}
