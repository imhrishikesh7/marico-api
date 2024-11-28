import { MigrationInterface, QueryRunner } from "typeorm";

export class Qr1732796627471 implements MigrationInterface {
    name = 'Qr1732796627471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`qr_link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brand\` ADD \`insta_url\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\` (\`qr_link\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6b9a741dbaeb81371c17a4aab2\` ON \`title_category\``);
        await queryRunner.query(`ALTER TABLE \`brand\` DROP COLUMN \`insta_url\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`qr_link\``);
    }

}
