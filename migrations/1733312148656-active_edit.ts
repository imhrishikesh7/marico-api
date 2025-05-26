import { MigrationInterface, QueryRunner } from "typeorm";

export class ActiveEdit1733312148656 implements MigrationInterface {
    name = 'ActiveEdit1733312148656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`history\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`recognition\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`CREATE INDEX \`IDX_64e2c1905714c33391e963791b\` ON \`history\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_bb89ef623d733c8d0988f70dbd\` ON \`recognition\` (\`is_active\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bb89ef623d733c8d0988f70dbd\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_64e2c1905714c33391e963791b\` ON \`history\``);
        await queryRunner.query(`ALTER TABLE \`recognition\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`history\` DROP COLUMN \`is_active\``);
    }

}
