import { MigrationInterface, QueryRunner } from "typeorm";

export class Regions1716368273578 implements MigrationInterface {
    name = 'Regions1716368273578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`region\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`alias\` varchar(255) NOT NULL, \`thumbnail\` json NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_8d766fc1d4d2e72ecd5f6567a0\` (\`name\`), INDEX \`IDX_7a21cf21d2b63c1a402358ba06\` (\`alias\`), INDEX \`IDX_04d79b0151b8401236c956f438\` (\`is_active\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_04d79b0151b8401236c956f438\` ON \`region\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a21cf21d2b63c1a402358ba06\` ON \`region\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d766fc1d4d2e72ecd5f6567a0\` ON \`region\``);
        await queryRunner.query(`DROP TABLE \`region\``);
    }

}
