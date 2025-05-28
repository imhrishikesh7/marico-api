import { MigrationInterface, QueryRunner } from "typeorm";

export class Page21728987004088 implements MigrationInterface {
    name = 'Page21728987004088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`canonical_override\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`indexed\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`meta_description\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`meta_image\``);
        await queryRunner.query(`ALTER TABLE \`page\` DROP COLUMN \`meta_title\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`region\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`region\``);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`meta_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`meta_image\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`meta_description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`indexed\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page\` ADD \`canonical_override\` varchar(255) NOT NULL`);
    }

}
