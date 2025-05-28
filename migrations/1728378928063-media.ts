import { MigrationInterface, QueryRunner } from "typeorm";

export class Media1728378928063 implements MigrationInterface {
    name = 'Media1728378928063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`media\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category\` varchar(255) NOT NULL, \`media_title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`description\` text NULL, \`media_pdf\` text NULL, \`year\` varchar(255) NOT NULL, \`media_regions\` json NOT NULL, \`release_date\` date NOT NULL, \`external_link\` text NULL, \`small_image\` json NULL, \`thumbnail\` json NULL, \`marico_img\` json NULL, \`sort_order\` int NOT NULL, \`is_latest\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_58f44d1840bcbcb7fca8db769e\` (\`category\`), INDEX \`IDX_225b7b88a896c72b2a8c0fe018\` (\`media_title\`), INDEX \`IDX_c41b406d1139e1e12dc574bc20\` (\`url_title\`), INDEX \`IDX_5945fa645cfcc701fe72f65e30\` (\`year\`), INDEX \`IDX_b5c24d310f2638a1e8a4f9e918\` (\`sort_order\`), INDEX \`IDX_0066aadee7d1d61f899a54fffc\` (\`is_latest\`), INDEX \`IDX_c30f45ea7b47895ca14398e974\` (\`created_at\`), INDEX \`IDX_46cc6399e00f4d3984d5731ea4\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`history\` DROP COLUMN \`description\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`history\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_46cc6399e00f4d3984d5731ea4\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_c30f45ea7b47895ca14398e974\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_0066aadee7d1d61f899a54fffc\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5c24d310f2638a1e8a4f9e918\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_5945fa645cfcc701fe72f65e30\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_c41b406d1139e1e12dc574bc20\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_225b7b88a896c72b2a8c0fe018\` ON \`media\``);
        await queryRunner.query(`DROP INDEX \`IDX_58f44d1840bcbcb7fca8db769e\` ON \`media\``);
        await queryRunner.query(`DROP TABLE \`media\``);
    }

}
