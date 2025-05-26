import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutusRecognition1718087800299 implements MigrationInterface {
    name = 'AboutusRecognition1718087800299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`recognition\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url_title\` varchar(255) NOT NULL, \`thumbnail\` json NULL, \`award_title\` varchar(255) NOT NULL, \`year\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`category\` varchar(255) NOT NULL, \`is_featured\` tinyint NOT NULL, \`regions\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_07c83f2fdc505877ff701b227d\` (\`url_title\`), INDEX \`IDX_b33240a0d4d4d3eb22ce2f31a5\` (\`award_title\`), INDEX \`IDX_87b8e80014a40e07d9e530c2aa\` (\`year\`), INDEX \`IDX_067b534c47e632cee888246bb4\` (\`is_featured\`), INDEX \`IDX_b78ef07292c13dae3c691ebf32\` (\`created_at\`), INDEX \`IDX_a3b871e8d1d0a2a3f723ae0786\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a3b871e8d1d0a2a3f723ae0786\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_b78ef07292c13dae3c691ebf32\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_067b534c47e632cee888246bb4\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_87b8e80014a40e07d9e530c2aa\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_b33240a0d4d4d3eb22ce2f31a5\` ON \`recognition\``);
        await queryRunner.query(`DROP INDEX \`IDX_07c83f2fdc505877ff701b227d\` ON \`recognition\``);
        await queryRunner.query(`DROP TABLE \`recognition\``);
    }

}
