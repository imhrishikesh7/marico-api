import { MigrationInterface, QueryRunner } from "typeorm";

export class InvestorMI1730890636359 implements MigrationInterface {
    name = 'InvestorMI1730890636359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`investor_mi\` (\`id\` int NOT NULL AUTO_INCREMENT, \`mi_documentation_title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`mi_documentation_pdf\` text NOT NULL, \`mi_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_beb74e5d4562e842f8ef1ec274\` (\`mi_documentation_title\`), INDEX \`IDX_8bf3b8ae9770938265b3450413\` (\`url_title\`), INDEX \`IDX_14937a1ea25cf73796ab74068a\` (\`sort_order\`), INDEX \`IDX_195ef3f738b8a66936f825eaa1\` (\`created_at\`), INDEX \`IDX_506a6c05e0217f0400beb12d47\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_506a6c05e0217f0400beb12d47\` ON \`investor_mi\``);
        await queryRunner.query(`DROP INDEX \`IDX_195ef3f738b8a66936f825eaa1\` ON \`investor_mi\``);
        await queryRunner.query(`DROP INDEX \`IDX_14937a1ea25cf73796ab74068a\` ON \`investor_mi\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bf3b8ae9770938265b3450413\` ON \`investor_mi\``);
        await queryRunner.query(`DROP INDEX \`IDX_beb74e5d4562e842f8ef1ec274\` ON \`investor_mi\``);
        await queryRunner.query(`DROP TABLE \`investor_mi\``);
    }

}
