import { MigrationInterface, QueryRunner } from "typeorm";

export class Newparam1731390688286 implements MigrationInterface {
    name = 'Newparam1731390688286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` ADD \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_ar\` ADD \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`show_in_front\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sitemap\` DROP COLUMN \`meta_description\``);
        await queryRunner.query(`ALTER TABLE \`sitemap\` ADD \`meta_description\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_39d0499fad6bdfec4d4281d13e\` ON \`corporate_governance\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_eaad105df2ba2be53fccda8b83\` ON \`investor_dividends\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_3e16b5a2dca1dfe8b2fb36f34f\` ON \`investor_ar\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_6cc9d88c37b44152a5833674bd\` ON \`brand\` (\`show_in_front\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5bd6a5cdab9e290e2397a58ec4\` ON \`brand\` (\`is_active\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5bd6a5cdab9e290e2397a58ec4\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_6cc9d88c37b44152a5833674bd\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e16b5a2dca1dfe8b2fb36f34f\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_eaad105df2ba2be53fccda8b83\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_39d0499fad6bdfec4d4281d13e\` ON \`corporate_governance\``);
        await queryRunner.query(`ALTER TABLE \`sitemap\` DROP COLUMN \`meta_description\``);
        await queryRunner.query(`ALTER TABLE \`sitemap\` ADD \`meta_description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`show_in_front\``);
        await queryRunner.query(`ALTER TABLE \`investor_ar\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`corporate_governance\` DROP COLUMN \`is_active\``);
    }

}
