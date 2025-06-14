import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable41727351813454 implements MigrationInterface {
    name = 'EditTable41727351813454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` ADD \`documentation_cg_category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` DROP COLUMN \`documentation_cg_pdf\``);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` ADD \`documentation_cg_pdf\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` DROP COLUMN \`agm_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` ADD \`agm_documentation_pdf\` text NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_aaff40dabdc5adda2ed64be49a\` ON \`corporate_governance\` (\`documentation_cg_category\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_aaff40dabdc5adda2ed64be49a\` ON \`corporate_governance\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` DROP COLUMN \`agm_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` ADD \`agm_documentation_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` DROP COLUMN \`documentation_cg_pdf\``);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` ADD \`documentation_cg_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` DROP COLUMN \`documentation_cg_category\``);
    }

}
