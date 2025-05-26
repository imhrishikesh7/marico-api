import { MigrationInterface, QueryRunner } from "typeorm";

export class PageContentEdit1732880261645 implements MigrationInterface {
    name = 'PageContentEdit1732880261645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`download_link\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`download_link\``);
    }

}
