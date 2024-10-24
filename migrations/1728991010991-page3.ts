import { MigrationInterface, QueryRunner } from "typeorm";

export class Page31728991010991 implements MigrationInterface {
    name = 'Page31728991010991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`page_type\` enum ('page') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`page_type\``);
    }

}
