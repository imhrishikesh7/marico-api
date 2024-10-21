import { MigrationInterface, QueryRunner } from "typeorm";

export class ScheduleEdit1729517262866 implements MigrationInterface {
    name = 'ScheduleEdit1729517262866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` ADD \`region\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` DROP COLUMN \`region\``);
    }

}
