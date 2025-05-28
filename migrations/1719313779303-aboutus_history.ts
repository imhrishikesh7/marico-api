import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutusHistory1719313779303 implements MigrationInterface {
    name = 'AboutusHistory1719313779303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`thumbnail\` json NULL, \`history_title\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`description\` text NOT NULL, \`regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_ad51098d6c28d9b58d85a99853\` (\`title\`), INDEX \`IDX_30573a04bc78923c9940128e16\` (\`url_title\`), INDEX \`IDX_378525d3c94e670ebe2e592fa6\` (\`history_title\`), INDEX \`IDX_159a4fe494b69432d12650a220\` (\`year\`), INDEX \`IDX_f8451a10a96bf481f8c4ded1a7\` (\`sort_order\`), INDEX \`IDX_b0547d7dbcef2b1f8f626425ce\` (\`created_at\`), INDEX \`IDX_cefab76f3a159118842f5bd634\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cefab76f3a159118842f5bd634\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0547d7dbcef2b1f8f626425ce\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_f8451a10a96bf481f8c4ded1a7\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_159a4fe494b69432d12650a220\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_378525d3c94e670ebe2e592fa6\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_30573a04bc78923c9940128e16\` ON \`history\``);
        await queryRunner.query(`DROP INDEX \`IDX_ad51098d6c28d9b58d85a99853\` ON \`history\``);
        await queryRunner.query(`DROP TABLE \`history\``);
    }

}
