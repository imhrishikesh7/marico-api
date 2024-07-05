import { MigrationInterface, QueryRunner } from "typeorm";

export class Investors21720157330682 implements MigrationInterface {
    name = 'Investors21720157330682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_qu_master\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`investor_qu_year\` varchar(255) NOT NULL, \`qu_year_sort\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_dbfa15531fdeeb2619fb0d6b3a\` (\`title\`), INDEX \`IDX_c5f474500d86a4fba405c3d7c9\` (\`url_title\`), INDEX \`IDX_10723fca38a08e35a49e98eff6\` (\`investor_qu_year\`), INDEX \`IDX_67a267127a4dab8620df210a3a\` (\`qu_year_sort\`), INDEX \`IDX_a0b8156b5f202e08507f6c3ed5\` (\`created_at\`), INDEX \`IDX_8b06321fab6cd8fb65dfd5337b\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quartely_update\` (\`id\` int NOT NULL AUTO_INCREMENT, \`investor_qu_id\` int NOT NULL, \`investor_qu\` varchar(255) NOT NULL, \`investor_qu_pdf\` varchar(255) NOT NULL, \`qu_pdf\` json NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_eca3730e971d0afa97c5ce23f0\` (\`investor_qu_id\`), INDEX \`IDX_2300086115a3859892151e062a\` (\`investor_qu\`), INDEX \`IDX_6111652f2600fea095144ba5ad\` (\`investor_qu_pdf\`), INDEX \`IDX_976e9af5b4e1a781a2358ab22a\` (\`sort_order\`), INDEX \`IDX_cfe8b7706ee6fafd2783dfdd11\` (\`created_at\`), INDEX \`IDX_6c8b3321649a12501cd30782ce\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c8b3321649a12501cd30782ce\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_cfe8b7706ee6fafd2783dfdd11\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_976e9af5b4e1a781a2358ab22a\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_6111652f2600fea095144ba5ad\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_2300086115a3859892151e062a\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_eca3730e971d0afa97c5ce23f0\` ON \`quartely_update\``);
        await queryRunner.query(`DROP TABLE \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b06321fab6cd8fb65dfd5337b\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0b8156b5f202e08507f6c3ed5\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP INDEX \`IDX_67a267127a4dab8620df210a3a\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP INDEX \`IDX_10723fca38a08e35a49e98eff6\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP INDEX \`IDX_c5f474500d86a4fba405c3d7c9\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbfa15531fdeeb2619fb0d6b3a\` ON \`investor_qu_master\``);
        await queryRunner.query(`DROP TABLE \`investor_qu_master\``);
    }

}
