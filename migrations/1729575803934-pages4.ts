import { MigrationInterface, QueryRunner } from "typeorm";

export class Pages41729575803934 implements MigrationInterface {
    name = 'Pages41729575803934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`short_description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`short_description\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`link\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`title\``);
    }

}
