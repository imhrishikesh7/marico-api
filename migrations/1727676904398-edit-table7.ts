import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable71727676904398 implements MigrationInterface {
    name = 'EditTable71727676904398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_345a7ab00be478496a4dae10f1\` ON \`quartely_update\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_345a7ab00be478496a4dae10f1\` ON \`quartely_update\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`title\``);
    }

}
