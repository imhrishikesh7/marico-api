import { MigrationInterface, QueryRunner } from "typeorm";

export class Sitemap1731328442952 implements MigrationInterface {
    name = 'Sitemap1731328442952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sitemap\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ref\` varchar(255) NOT NULL, \`ref_id\` int NOT NULL, \`meta_title\` varchar(255) NOT NULL, \`meta_description\` text NOT NULL, \`canonical_url\` varchar(255) NOT NULL, \`meta_image\` json NULL, \`indexed\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_1202dc9114094021c3ec3d5260\` (\`ref\`), INDEX \`IDX_c353b7e1944737305a841eebeb\` (\`ref_id\`), INDEX \`IDX_4990617598ba73eff6d2b77f46\` (\`meta_title\`), INDEX \`IDX_069e7a99b45ed61f592596d0a7\` (\`canonical_url\`), INDEX \`IDX_dd2ff26cfb66bbfc45af2480a5\` (\`indexed\`), INDEX \`IDX_f91821cd43f573a6fa3b245847\` (\`created_at\`), INDEX \`IDX_180f0a99ef2438a3f781503f77\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` ADD \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_8ee9b2ca7e56badfeb03f4bb6e\` ON \`investor_agm\` (\`is_active\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8ee9b2ca7e56badfeb03f4bb6e\` ON \`investor_agm\``);
        await queryRunner.query(`ALTER TABLE \`investor_agm\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`DROP INDEX \`IDX_180f0a99ef2438a3f781503f77\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_f91821cd43f573a6fa3b245847\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd2ff26cfb66bbfc45af2480a5\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_069e7a99b45ed61f592596d0a7\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_4990617598ba73eff6d2b77f46\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_c353b7e1944737305a841eebeb\` ON \`sitemap\``);
        await queryRunner.query(`DROP INDEX \`IDX_1202dc9114094021c3ec3d5260\` ON \`sitemap\``);
        await queryRunner.query(`DROP TABLE \`sitemap\``);
    }

}
