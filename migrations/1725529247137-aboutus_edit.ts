import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutusEdit1725529247137 implements MigrationInterface {
    name = 'AboutusEdit1725529247137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`page_content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`page_ref_id\` int NOT NULL, \`page_ref\` varchar(255) NOT NULL, \`content\` json NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_706bae1563711a2356c4978170\` (\`page_ref_id\`), INDEX \`IDX_f85be9f7b42b8417b50bb4bfac\` (\`page_ref\`), INDEX \`IDX_d69a03b883ac618dc2fa41abff\` (\`is_active\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_fd04e631bf857b757e33711e5b\` (\`name\`), INDEX \`IDX_77f2f5a2fd954fd1ab0d13f5d2\` (\`url\`), INDEX \`IDX_6cfc48bef527a4a051d489ff11\` (\`is_active\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`aboutus_member\` ADD \`regions\` json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aboutus_member\` DROP COLUMN \`regions\``);
        await queryRunner.query(`DROP INDEX \`IDX_6cfc48bef527a4a051d489ff11\` ON \`pages\``);
        await queryRunner.query(`DROP INDEX \`IDX_77f2f5a2fd954fd1ab0d13f5d2\` ON \`pages\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd04e631bf857b757e33711e5b\` ON \`pages\``);
        await queryRunner.query(`DROP TABLE \`pages\``);
        await queryRunner.query(`DROP INDEX \`IDX_d69a03b883ac618dc2fa41abff\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_f85be9f7b42b8417b50bb4bfac\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_706bae1563711a2356c4978170\` ON \`page_content\``);
        await queryRunner.query(`DROP TABLE \`page_content\``);
    }

}
