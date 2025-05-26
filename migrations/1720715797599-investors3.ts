import { MigrationInterface, QueryRunner } from "typeorm";

export class Investors31720715797599 implements MigrationInterface {
    name = 'Investors31720715797599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sustainability\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`sustainability_title\` varchar(255) NOT NULL, \`sustain_documentation_pdf\` json NULL, \`sustain_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_354ac5e86ed796f9327770f38f\` (\`title\`), INDEX \`IDX_6e0215118079608b72008e20af\` (\`url_title\`), INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` (\`sustainability_title\`), INDEX \`IDX_8b34545dc87098c29c952303c8\` (\`sort_order\`), INDEX \`IDX_216a735b8fcdd203d261c07a9c\` (\`created_at\`), INDEX \`IDX_dc86edf698f866879ccfd7cbe1\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`schedule_analyst_meet_pdf\` json NULL, \`schedule_analyst_meet_year\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6064f29e2ac3cb37cf06057f46\` (\`title\`), INDEX \`IDX_12973fcdcf2d9c3c0aae2efc49\` (\`url_title\`), INDEX \`IDX_af310665f006644eac54197f27\` (\`schedule_analyst_meet_year\`), INDEX \`IDX_9fe0193c83f0f9cfe731dd5ebd\` (\`created_at\`), INDEX \`IDX_052874624017fc4d7a949adb1c\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`DROP INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` ON \`sustainability\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustainability_title\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustain_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustain_regions\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustainability_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustain_documentation_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustain_regions\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`documentation_cg_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`documentation_cg_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`cg_regions\` json NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` ON \`sustainability\` (\`sustainability_title\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_4779e0154b4b2a15a583b5cb2d\` ON \`sustainability\` (\`documentation_cg_title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4779e0154b4b2a15a583b5cb2d\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` ON \`sustainability\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`cg_regions\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`documentation_cg_pdf\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`documentation_cg_title\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustain_regions\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustain_documentation_pdf\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`sustainability_title\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustain_regions\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustain_documentation_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`sustainability_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` ON \`sustainability\` (\`sustainability_title\`)`);
        await queryRunner.query(`DROP INDEX \`IDX_052874624017fc4d7a949adb1c\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_9fe0193c83f0f9cfe731dd5ebd\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_af310665f006644eac54197f27\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_12973fcdcf2d9c3c0aae2efc49\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_6064f29e2ac3cb37cf06057f46\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP TABLE \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc86edf698f866879ccfd7cbe1\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_216a735b8fcdd203d261c07a9c\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b34545dc87098c29c952303c8\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_5db7cc68312c51b5c8c02fec56\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_6e0215118079608b72008e20af\` ON \`sustainability\``);
        await queryRunner.query(`DROP INDEX \`IDX_354ac5e86ed796f9327770f38f\` ON \`sustainability\``);
        await queryRunner.query(`DROP TABLE \`sustainability\``);
    }

}
