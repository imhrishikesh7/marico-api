import { MigrationInterface, QueryRunner } from "typeorm";

export class Investor41727778910050 implements MigrationInterface {
    name = 'Investor41727778910050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_ar\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ar_documentation_year\` varchar(255) NOT NULL, \`ar_documentation_title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`ar_documentation_pdf\` text NOT NULL, \`ar_regions\` json NOT NULL, \`investors_ar_category\` varchar(255) NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_24aef1ae8a5e91d3b9395cfa11\` (\`ar_documentation_year\`), INDEX \`IDX_083afbf88c06f0fbb88fadb792\` (\`ar_documentation_title\`), INDEX \`IDX_27e9b2f1394139ed018d90822a\` (\`url_title\`), INDEX \`IDX_2305c4e0a8be0b43aaffc7f87f\` (\`investors_ar_category\`), INDEX \`IDX_677fd18aca57e92e861bd740ce\` (\`sort_order\`), INDEX \`IDX_942516e4eb55a829d9bb5360c8\` (\`created_at\`), INDEX \`IDX_5e516f008592529e13133afd92\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5e516f008592529e13133afd92\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_942516e4eb55a829d9bb5360c8\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_677fd18aca57e92e861bd740ce\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_2305c4e0a8be0b43aaffc7f87f\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_27e9b2f1394139ed018d90822a\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_083afbf88c06f0fbb88fadb792\` ON \`investor_ar\``);
        await queryRunner.query(`DROP INDEX \`IDX_24aef1ae8a5e91d3b9395cfa11\` ON \`investor_ar\``);
        await queryRunner.query(`DROP TABLE \`investor_ar\``);
    }

}
