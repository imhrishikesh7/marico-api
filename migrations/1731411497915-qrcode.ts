import { MigrationInterface, QueryRunner } from "typeorm";

export class Qrcode1731411497915 implements MigrationInterface {
    name = 'Qrcode1731411497915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` CHANGE \`qr_link\` \`qr_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`qr_code\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`qr_code\` json NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`qr_code\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`qr_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`title_category\` CHANGE \`qr_code\` \`qr_link\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\` (\`qr_link\`)`);
    }

}
