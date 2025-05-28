import { MigrationInterface, QueryRunner } from "typeorm";

export class Investors1719560333975 implements MigrationInterface {
    name = 'Investors1719560333975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_agm\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`agm_documentation_title\` varchar(255) NOT NULL, \`agm_documentation_pdf\` json NULL, \`agm_regions\` json NOT NULL, \`investors_agm_category\` varchar(255) NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_72992583524c5e029a7c3faca5\` (\`title\`), INDEX \`IDX_80e1ed130cd01eed87e17794b0\` (\`url_title\`), INDEX \`IDX_183805495547af522f7f199e12\` (\`agm_documentation_title\`), INDEX \`IDX_d2ab54e44f54d5ac5aadf03a82\` (\`investors_agm_category\`), INDEX \`IDX_cf15b1759103d1da585c679158\` (\`sort_order\`), INDEX \`IDX_bb706b408d3083bbe3bbac4a31\` (\`created_at\`), INDEX \`IDX_34826797d62b26c921e10c4b4d\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_share_holder\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`investors_shi_title\` varchar(255) NOT NULL, \`investors_shi_pdf\` json NULL, \`regions\` json NOT NULL, \`investors_shi_year\` varchar(255) NOT NULL, \`investors_shi_category\` varchar(255) NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_ee30ae95489f32a0f75150a0eb\` (\`title\`), INDEX \`IDX_7d516832106916b8165c856063\` (\`url_title\`), INDEX \`IDX_5186bcc0d0477f1aa0a157cc74\` (\`investors_shi_title\`), INDEX \`IDX_e8e178b877c02de62d1f725195\` (\`investors_shi_year\`), INDEX \`IDX_51fdc9fb8e0dba218586ac471b\` (\`investors_shi_category\`), INDEX \`IDX_771406277496a0b8de79dff7fb\` (\`sort_order\`), INDEX \`IDX_3fba05e9b06ff4aa6757d4e249\` (\`created_at\`), INDEX \`IDX_a4482236dbafaca960b565c253\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_dividends\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`dividend_history\` json NULL, \`history_writeup\` text NOT NULL, \`unclaimed_interim_dividends\` json NULL, \`unclaimed_interim_dividends_writeup\` text NOT NULL, \`unclaimed_interim_dividends_year\` varchar(255) NOT NULL, \`unclaimed_dividends\` json NULL, \`unclaimed_dividends_writeup\` text NOT NULL, \`unclaimed_dividends_year\` varchar(255) NOT NULL, \`transfer_shares_to_IEPF\` json NULL, \`transfer_shares_to_IEPF_writeup\` text NOT NULL, \`transfer_shares_to_IEPF_year\` varchar(255) NOT NULL, \`forms_pdf\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_282a1c9b73ca799448e8b6aad2\` (\`title\`), INDEX \`IDX_b5a65877ea42d30ee309842f1a\` (\`url_title\`), INDEX \`IDX_a059e7dda248ee014d0cc9b078\` (\`unclaimed_interim_dividends_year\`), INDEX \`IDX_78897a0c4030cef44b4e7a981d\` (\`unclaimed_dividends_year\`), INDEX \`IDX_4ec68a36aa6df2be04c527adcc\` (\`transfer_shares_to_IEPF_year\`), INDEX \`IDX_cac852bd486a9ff7d1c6d58883\` (\`created_at\`), INDEX \`IDX_2eb2a36664212133d525891b4b\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2eb2a36664212133d525891b4b\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_cac852bd486a9ff7d1c6d58883\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_4ec68a36aa6df2be04c527adcc\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_78897a0c4030cef44b4e7a981d\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_a059e7dda248ee014d0cc9b078\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5a65877ea42d30ee309842f1a\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_282a1c9b73ca799448e8b6aad2\` ON \`investor_dividends\``);
        await queryRunner.query(`DROP TABLE \`investor_dividends\``);
        await queryRunner.query(`DROP INDEX \`IDX_a4482236dbafaca960b565c253\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fba05e9b06ff4aa6757d4e249\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_771406277496a0b8de79dff7fb\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_51fdc9fb8e0dba218586ac471b\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_e8e178b877c02de62d1f725195\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_5186bcc0d0477f1aa0a157cc74\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d516832106916b8165c856063\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee30ae95489f32a0f75150a0eb\` ON \`investor_share_holder\``);
        await queryRunner.query(`DROP TABLE \`investor_share_holder\``);
        await queryRunner.query(`DROP INDEX \`IDX_34826797d62b26c921e10c4b4d\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb706b408d3083bbe3bbac4a31\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf15b1759103d1da585c679158\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_d2ab54e44f54d5ac5aadf03a82\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_183805495547af522f7f199e12\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_80e1ed130cd01eed87e17794b0\` ON \`investor_agm\``);
        await queryRunner.query(`DROP INDEX \`IDX_72992583524c5e029a7c3faca5\` ON \`investor_agm\``);
        await queryRunner.query(`DROP TABLE \`investor_agm\``);
    }

}
