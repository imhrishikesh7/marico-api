import { MigrationInterface, QueryRunner } from "typeorm";

export class Feature1729253319020 implements MigrationInterface {
    name = 'Feature1729253319020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`title_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menu\` varchar(255) NOT NULL, \`sub_menu\` varchar(255) NOT NULL, \`category_title\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_d8f2d6c7ef28ab19826a308afe\` (\`menu\`), INDEX \`IDX_4fb42f3fe8426d973d6cd57e4f\` (\`sub_menu\`), INDEX \`IDX_e435193d6d2e98384c63fb5fb8\` (\`category_title\`), INDEX \`IDX_0f5819854b1d91be0938390c39\` (\`is_active\`), INDEX \`IDX_0c5920c080e176ae86753feb9e\` (\`created_at\`), INDEX \`IDX_503d6f050693d2c08515d82dad\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`DROP INDEX \`IDX_503d6f050693d2c08515d82dad\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_0c5920c080e176ae86753feb9e\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f5819854b1d91be0938390c39\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_e435193d6d2e98384c63fb5fb8\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fb42f3fe8426d973d6cd57e4f\` ON \`title_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8f2d6c7ef28ab19826a308afe\` ON \`title_category\``);
        await queryRunner.query(`DROP TABLE \`title_category\``);
    }

}
