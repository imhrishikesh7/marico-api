import { MigrationInterface, QueryRunner } from "typeorm";

export class Media31728892747568 implements MigrationInterface {
    name = 'Media31728892747568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`release_date\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`release_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`media\` CHANGE \`is_latest\` \`is_latest\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`media\` CHANGE \`is_latest\` \`is_latest\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`media\` DROP COLUMN \`release_date\``);
        await queryRunner.query(`ALTER TABLE \`media\` ADD \`release_date\` date NOT NULL`);
    }

}
