import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable91727960148472 implements MigrationInterface {
    name = 'EditTable91727960148472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_282a1c9b73ca799448e8b6aad2\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ec68a36aa6df2be04c527adcc\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_78897a0c4030cef44b4e7a981d\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_a059e7dda248ee014d0cc9b078\` ON \`investor_dividends\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`dividend_history\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`history_writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_interim_dividends\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_interim_dividends_writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_interim_dividends_year\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_dividends\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_dividends_writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`unclaimed_dividends_year\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`transfer_shares_to_IEPF\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`transfer_shares_to_IEPF_writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`transfer_shares_to_IEPF_year\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`forms_pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`investors_dividend_category\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`investors_dividend_subcategory\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`pdf_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`pdf\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`writeup\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`dividends_year\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`dividend_regions\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`sort_order\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_9f3c59fd3334ae83827690e7a5\` ON \`investor_dividends\` (\`investors_dividend_category\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_6ca70df1ddd9e57d97c8cd165a\` ON \`investor_dividends\` (\`investors_dividend_subcategory\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e1e4cc83acb9bd0edc5f93bc8e\` ON \`investor_dividends\` (\`pdf_title\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_7816be54c22f27c7abf1b2fba8\` ON \`investor_dividends\` (\`writeup\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_b9e21a0ecad1bf7c9c1415c15e\` ON \`investor_dividends\` (\`dividends_year\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_731af01c3b5c50025238aef177\` ON \`investor_dividends\` (\`sort_order\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_731af01c3b5c50025238aef177\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9e21a0ecad1bf7c9c1415c15e\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_7816be54c22f27c7abf1b2fba8\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_e1e4cc83acb9bd0edc5f93bc8e\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ca70df1ddd9e57d97c8cd165a\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f3c59fd3334ae83827690e7a5\` ON \`investor_dividends\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`sort_order\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`dividend_regions\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`dividends_year\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`writeup\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`pdf\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`pdf_title\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`investors_dividend_subcategory\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` DROP COLUMN \`investors_dividend_category\``);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`forms_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`transfer_shares_to_IEPF_year\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`transfer_shares_to_IEPF_writeup\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`transfer_shares_to_IEPF\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_dividends_year\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_dividends_writeup\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_dividends\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_interim_dividends_year\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_interim_dividends_writeup\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`unclaimed_interim_dividends\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`history_writeup\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`dividend_history\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`investor_dividends\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_a059e7dda248ee014d0cc9b078\` ON \`investor_dividends\` (\`unclaimed_interim_dividends_year\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_78897a0c4030cef44b4e7a981d\` ON \`investor_dividends\` (\`unclaimed_dividends_year\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_4ec68a36aa6df2be04c527adcc\` ON \`investor_dividends\` (\`transfer_shares_to_IEPF_year\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_282a1c9b73ca799448e8b6aad2\` ON \`investor_dividends\` (\`title\`)`);
    }

}
