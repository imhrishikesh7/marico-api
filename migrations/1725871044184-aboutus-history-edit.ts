import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutusHistoryEdit1725871044184 implements MigrationInterface {
    name = 'AboutusHistoryEdit1725871044184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_159a4fe494b69432d12650a220\` ON \`history\``);
        await queryRunner.query(`ALTER TABLE \`history\` DROP COLUMN \`year\``);
        await queryRunner.query(`ALTER TABLE \`history\` ADD \`year\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_159a4fe494b69432d12650a220\` ON \`history\` (\`year\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_159a4fe494b69432d12650a220\` ON \`history\``);
        await queryRunner.query(`ALTER TABLE \`history\` DROP COLUMN \`year\``);
        await queryRunner.query(`ALTER TABLE \`history\` ADD \`year\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_159a4fe494b69432d12650a220\` ON \`history\` (\`year\`)`);
    }

}
