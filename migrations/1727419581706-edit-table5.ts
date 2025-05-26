import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable51727419581706 implements MigrationInterface {
    name = 'EditTable51727419581706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` DROP COLUMN \`schedule_analyst_meet_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` ADD \`schedule_analyst_meet_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` DROP COLUMN \`schedule_analyst_meet_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` ADD \`schedule_analyst_meet_pdf\` json NULL`);
    }

}
