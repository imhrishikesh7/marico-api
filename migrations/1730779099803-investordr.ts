import { MigrationInterface, QueryRunner } from "typeorm";

export class Investordr1730779099803 implements MigrationInterface {
    name = 'Investordr1730779099803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_dr\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dr_documentation_year\` varchar(255) NOT NULL, \`dr_documentation_title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`dr_documentation_pdf\` text NOT NULL, \`dr_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_96c595614ca1861f7144cd2052\` (\`dr_documentation_year\`), INDEX \`IDX_3b4245d0c0f9b5202655566920\` (\`dr_documentation_title\`), INDEX \`IDX_a1bf87b19d3b0465467c563373\` (\`url_title\`), INDEX \`IDX_7db6cf894c2c7f1eb198ae5851\` (\`sort_order\`), INDEX \`IDX_8237bbab4c705733a4a4838dda\` (\`created_at\`), INDEX \`IDX_155f8f88e73a8c2d01549017b1\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`qr_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`qr_link\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_1ce6d743a302cd76392523f04a\` ON \`title_category\` (\`qr_title\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\` (\`qr_link\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ce6d743a302cd76392523f04a\` ON \`title_category\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`qr_link\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`qr_title\``);
        await queryRunner.query(`DROP INDEX \`IDX_155f8f88e73a8c2d01549017b1\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_8237bbab4c705733a4a4838dda\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_7db6cf894c2c7f1eb198ae5851\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_a1bf87b19d3b0465467c563373\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_3b4245d0c0f9b5202655566920\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_96c595614ca1861f7144cd2052\` ON \`investor_dr\``);
        await queryRunner.query(`DROP TABLE \`investor_dr\``);
    }

}
