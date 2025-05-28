import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumn1747909559358 implements MigrationInterface {
    name = 'NewColumn1747909559358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sitemap\` ADD UNIQUE INDEX \`IDX_c353b7e1944737305a841eebeb\` (\`ref_id\`)`);
        await queryRunner.query(`ALTER TABLE \`media\` CHANGE \`is_latest\` \`is_latest\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`writeup\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_faq\` DROP COLUMN \`answer\``);
        await queryRunner.query(`ALTER TABLE \`investor_faq\` ADD \`answer\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c353b7e1944737305a841eebeb\` ON \`sitemap\` (\`ref_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_7816be54c22f27c7abf1b2fba8\` ON \`investor_dividends\` (\`writeup\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_419f08a6bf1723628412f70322\` ON \`investor_faq\` (\`answer\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\` (\`email\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_be66ffe3f3cee35dc0bd354747\` ON \`aboutus_member\` (\`sort_order\`)`);
        await queryRunner.query(`ALTER TABLE \`sitemap\` ADD CONSTRAINT \`FK_c353b7e1944737305a841eebebd\` FOREIGN KEY (\`ref_id\`) REFERENCES \`page\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sitemap\` DROP FOREIGN KEY \`FK_c353b7e1944737305a841eebebd\``);
        await queryRunner.query(`DROP INDEX \`IDX_be66ffe3f3cee35dc0bd354747\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``);
        await queryRunner.query(`DROP INDEX \`IDX_419f08a6bf1723628412f70322\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_7816be54c22f27c7abf1b2fba8\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`REL_c353b7e1944737305a841eebeb\` ON \`sitemap\``);
        await queryRunner.query(`ALTER TABLE \`investor_faq\` DROP COLUMN \`answer\``);
        await queryRunner.query(`ALTER TABLE \`investor_faq\` ADD \`answer\` text COLLATE "utf8mb4_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`writeup\` text COLLATE "utf8mb4_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`media\` CHANGE \`is_latest\` \`is_latest\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sitemap\` DROP INDEX \`IDX_c353b7e1944737305a841eebeb\``);
    }

}
