import { MigrationInterface, QueryRunner } from "typeorm";

export class Pages51729745901293 implements MigrationInterface {
    name = 'Pages51729745901293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tvc\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tvc\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tvc\` CHANGE \`updated_at\` \`updated_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tvc\` CHANGE \`created_at\` \`created_at\` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`description\``);
    }

}
