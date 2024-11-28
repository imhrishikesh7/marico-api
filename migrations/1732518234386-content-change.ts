import { MigrationInterface, QueryRunner } from "typeorm";

export class ContentChange1732518234386 implements MigrationInterface {
    name = 'ContentChange1732518234386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`add_choice\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`add_choice\``);
    }

}
