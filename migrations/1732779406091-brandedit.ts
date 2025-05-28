import { MigrationInterface, QueryRunner } from "typeorm";

export class Brandedit1732779406091 implements MigrationInterface {
    name = 'Brandedit1732779406091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`facebook_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`twitter_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`youtube_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`web_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`web_url\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`youtube_url\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`twitter_url\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`facebook_url\``);
    }

}
