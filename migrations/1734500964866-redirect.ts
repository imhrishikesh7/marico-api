import { MigrationInterface, QueryRunner } from "typeorm";

export class Redirect1734500964866 implements MigrationInterface {
    name = 'Redirect1734500964866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`redirect_url\` (\`id\` int NOT NULL AUTO_INCREMENT, \`from_url\` text NOT NULL, \`to_url\` text NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_cf6d5bd5aa0e96c931ecab1c8e\` (\`is_active\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cf6d5bd5aa0e96c931ecab1c8e\` ON \`redirect_url\``);
        await queryRunner.query(`DROP TABLE \`redirect_url\``);
    }

}
