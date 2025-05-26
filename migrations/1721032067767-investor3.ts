import { MigrationInterface, QueryRunner } from "typeorm";

export class Investor31721032067767 implements MigrationInterface {
    name = 'Investor31721032067767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4779e0154b4b2a15a583b5cb2d\` ON \`sustainability\``);
        await queryRunner.query(`CREATE TABLE \`corporate_governance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`documentation_cg_title\` varchar(255) NOT NULL, \`documentation_cg_pdf\` json NULL, \`cg_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_91a1b6305d73b00ce990d35746\` (\`title\`), INDEX \`IDX_0c7a72d66ef024883c27d580a8\` (\`url_title\`), INDEX \`IDX_c947f0a33bb2017ae0cc6354d3\` (\`documentation_cg_title\`), INDEX \`IDX_106c3cae65dcb489892ef2a778\` (\`sort_order\`), INDEX \`IDX_ecace535ae988bf191c428f443\` (\`created_at\`), INDEX \`IDX_191cc4de8d642ba36be5bf9dd1\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`ic_contact_info\` varchar(255) NOT NULL, \`ic_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a03432181cb02d3c07de0a2dd6\` (\`title\`), INDEX \`IDX_d89f4404a7834612f717f98685\` (\`url_title\`), INDEX \`IDX_0f579f8884aa2292c0cd9bc1ec\` (\`ic_contact_info\`), INDEX \`IDX_61473ac542bd244c7ee2b2e95e\` (\`sort_order\`), INDEX \`IDX_1198820442118375def7b911bf\` (\`created_at\`), INDEX \`IDX_94a59e6b8d109c664e56f5baca\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_placement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`documentation_pd_title\` varchar(255) NOT NULL, \`pd_documentation_pdf\` json NULL, \`pd_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_bdf4aaa73bccf5fd55d3ed3364\` (\`title\`), INDEX \`IDX_ec27fb593c3f759fa3f39b9c66\` (\`url_title\`), INDEX \`IDX_68bc1da4171219e44c08fc23c2\` (\`documentation_pd_title\`), INDEX \`IDX_757b20e4dce1b44c20b4d16f03\` (\`sort_order\`), INDEX \`IDX_691bfc5b95a907e22cb390d2b2\` (\`created_at\`), INDEX \`IDX_6636fecb98861bb04c2ebbca3b\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`information_update\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`documentation_iu_title\` varchar(255) NOT NULL, \`iu_documentation_pdf\` json NULL, \`iu_regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_598f74dfb5995e09156ac34f7d\` (\`title\`), INDEX \`IDX_9b24ad12c97328ef1f64dcaafc\` (\`url_title\`), INDEX \`IDX_c18a81e133bebe1facc6362b8d\` (\`documentation_iu_title\`), INDEX \`IDX_09e722b876a9008ef3d2840301\` (\`sort_order\`), INDEX \`IDX_8376ee6621c8581278befd23f0\` (\`created_at\`), INDEX \`IDX_66709c3d58b5855501197d231a\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`investor_psi\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`documentation_psi_title\` varchar(255) NOT NULL, \`psi_documentation_pdf\` json NULL, \`psi_regions\` json NOT NULL, \`psi_category\` varchar(255) NOT NULL, \`sort_order\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_17cefe7fc8740db48f127fb3cd\` (\`title\`), INDEX \`IDX_a80c31150c8536830a9e03e6ce\` (\`url_title\`), INDEX \`IDX_10b6d32bf51760881de0061219\` (\`documentation_psi_title\`), INDEX \`IDX_018b83ecadee4f984bfb110802\` (\`psi_category\`), INDEX \`IDX_62269aba43e6f26eaa5c22a87d\` (\`sort_order\`), INDEX \`IDX_115d6dfc22541cba625cb45fd8\` (\`created_at\`), INDEX \`IDX_28e793b7704b340d51b70c2599\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`cg_regions\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`documentation_cg_pdf\``);
        await queryRunner.query(`ALTER TABLE \`sustainability\` DROP COLUMN \`documentation_cg_title\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`documentation_cg_title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`documentation_cg_pdf\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`sustainability\` ADD \`cg_regions\` json NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_28e793b7704b340d51b70c2599\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_115d6dfc22541cba625cb45fd8\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_62269aba43e6f26eaa5c22a87d\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_018b83ecadee4f984bfb110802\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_10b6d32bf51760881de0061219\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_a80c31150c8536830a9e03e6ce\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_17cefe7fc8740db48f127fb3cd\` ON \`investor_psi\``);
        await queryRunner.query(`DROP TABLE \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_66709c3d58b5855501197d231a\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_8376ee6621c8581278befd23f0\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_09e722b876a9008ef3d2840301\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_c18a81e133bebe1facc6362b8d\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b24ad12c97328ef1f64dcaafc\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_598f74dfb5995e09156ac34f7d\` ON \`information_update\``);
        await queryRunner.query(`DROP TABLE \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_6636fecb98861bb04c2ebbca3b\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_691bfc5b95a907e22cb390d2b2\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_757b20e4dce1b44c20b4d16f03\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_68bc1da4171219e44c08fc23c2\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec27fb593c3f759fa3f39b9c66\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdf4aaa73bccf5fd55d3ed3364\` ON \`investor_placement\``);
        await queryRunner.query(`DROP TABLE \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_94a59e6b8d109c664e56f5baca\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_1198820442118375def7b911bf\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_61473ac542bd244c7ee2b2e95e\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f579f8884aa2292c0cd9bc1ec\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_d89f4404a7834612f717f98685\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_a03432181cb02d3c07de0a2dd6\` ON \`investor_contact\``);
        await queryRunner.query(`DROP TABLE \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_191cc4de8d642ba36be5bf9dd1\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP INDEX \`IDX_ecace535ae988bf191c428f443\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP INDEX \`IDX_106c3cae65dcb489892ef2a778\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP INDEX \`IDX_c947f0a33bb2017ae0cc6354d3\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP INDEX \`IDX_0c7a72d66ef024883c27d580a8\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP INDEX \`IDX_91a1b6305d73b00ce990d35746\` ON \`corporate_governance\``);
        await queryRunner.query(`DROP TABLE \`corporate_governance\``);
        await queryRunner.query(`CREATE INDEX \`IDX_4779e0154b4b2a15a583b5cb2d\` ON \`sustainability\` (\`documentation_cg_title\`)`);
    }

}
