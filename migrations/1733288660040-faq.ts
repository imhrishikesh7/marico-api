import { MigrationInterface, QueryRunner } from "typeorm";

export class Faq1733288660040 implements MigrationInterface {
    name = 'Faq1733288660040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_faq\` (\`id\` int NOT NULL AUTO_INCREMENT, \`question\` varchar(255) NOT NULL, \`answer\` varchar(255) NOT NULL, \`regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_9b82f896e803627ad4d88e079a\` (\`question\`), INDEX \`IDX_419f08a6bf1723628412f70322\` (\`answer\`), INDEX \`IDX_f599e27ecbd19c1a1f2fb8e49d\` (\`sort_order\`), INDEX \`IDX_fc7d99fb31e10f42069952c5da\` (\`is_active\`), INDEX \`IDX_e961ecf1ecb2c3c5fbf0adcb40\` (\`created_at\`), INDEX \`IDX_4e023e012527dd2b67e3aaec83\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`title_category\` CHANGE \`qr_link\` \`qr_link\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`title_category\` CHANGE \`qr_link\` \`qr_link\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_4e023e012527dd2b67e3aaec83\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_e961ecf1ecb2c3c5fbf0adcb40\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc7d99fb31e10f42069952c5da\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_f599e27ecbd19c1a1f2fb8e49d\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_419f08a6bf1723628412f70322\` ON \`investor_faq\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b82f896e803627ad4d88e079a\` ON \`investor_faq\``);
        await queryRunner.query(`DROP TABLE \`investor_faq\``);
    }

}
