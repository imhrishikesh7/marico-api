import { MigrationInterface, QueryRunner } from "typeorm";

export class TitlecategoryEdit1732884896583 implements MigrationInterface {
    name = 'TitlecategoryEdit1732884896583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`title_category\` ADD \`sort_order\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_50c594513f9800f3fc528d12d2\` ON \`title_category\` (\`sort_order\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_50c594513f9800f3fc528d12d2\` ON \`title_category\``);
        await queryRunner.query(`ALTER TABLE \`title_category\` DROP COLUMN \`sort_order\``);
    }

}
