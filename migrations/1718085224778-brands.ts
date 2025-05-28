import { MigrationInterface, QueryRunner } from "typeorm";

export class Brands1718085224778 implements MigrationInterface {
    name = 'Brands1718085224778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tvc\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`tvc_title\` varchar(255) NOT NULL, \`tvc_description\` varchar(255) NOT NULL, \`tvc_type\` varchar(255) NOT NULL, \`tvc_code\` varchar(255) NOT NULL, \`regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`thumbnail\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_aa93318ac84bc718bf709c80c7\` (\`title\`), INDEX \`IDX_34dedd8e2ce2df3b74fed2a77e\` (\`url_title\`), INDEX \`IDX_68100d14629614bb10adea7415\` (\`tvc_title\`), INDEX \`IDX_343a598e26be7afc36dcfdfa23\` (\`tvc_description\`), INDEX \`IDX_98a828c4b3334fe75435d92f86\` (\`tvc_type\`), INDEX \`IDX_64432c8286ed0c1785e2ca13e2\` (\`tvc_code\`), INDEX \`IDX_65b960eff0db597e8d8b84deb1\` (\`sort_order\`), INDEX \`IDX_5082222ebdf20ac0b81bf2eab3\` (\`created_at\`), INDEX \`IDX_6a0af31813a5ac50e534e73cd4\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`print_ad\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`print_ad_title\` varchar(255) NOT NULL, \`regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`small_thumbnail\` json NULL, \`large_thumbnail\` json NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_5917b4edf8bc300ca34486113f\` (\`title\`), INDEX \`IDX_a4728f0c96533865e7a5d91f79\` (\`url_title\`), INDEX \`IDX_c6b0c08d3a47dcb0b21278db5d\` (\`print_ad_title\`), INDEX \`IDX_77690af1e50384a4ffab067dc0\` (\`sort_order\`), INDEX \`IDX_fe63bbba33798b2a5e7309d083\` (\`created_at\`), INDEX \`IDX_c637c8defee9868fff92463011\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`url_title\` varchar(255) NOT NULL, \`brand_title\` varchar(255) NOT NULL, \`brand_url_title\` varchar(255) NOT NULL, \`brand_type\` varchar(255) NOT NULL, \`short_text\` text NOT NULL, \`overview\` text NOT NULL, \`tvc_relation\` json NOT NULL, \`print_ad_relation\` json NOT NULL, \`award_relation\` json NOT NULL, \`sub_brand_relation\` json NOT NULL, \`is_featured\` tinyint NOT NULL, \`thumbnail1\` json NULL, \`thumbnail2\` json NULL, \`thumbnail3\` json NULL, \`thumbnail4\` json NULL, \`regions\` json NOT NULL, \`sort_order\` int NOT NULL, \`shop_now_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_1582bfd88329b634a25e6e3d90\` (\`title\`), INDEX \`IDX_5bc72498b59c83c7aaa1142936\` (\`url_title\`), INDEX \`IDX_a97b2003defd6f8ba1ad4e3eca\` (\`brand_title\`), INDEX \`IDX_133ee7889033db2d951b3ed0f7\` (\`brand_url_title\`), INDEX \`IDX_f83f5910120dcca8491a6dc8bb\` (\`brand_type\`), INDEX \`IDX_0b8bd836b488215bd133e9f0ef\` (\`is_featured\`), INDEX \`IDX_4554c20a65b38fe247ba9dcf3b\` (\`sort_order\`), INDEX \`IDX_93dcdf0169d3ba98dbe04edbc6\` (\`shop_now_url\`), INDEX \`IDX_afdef1051380bd8f4228e68d01\` (\`created_at\`), INDEX \`IDX_492f7f8398037558b5bd3ad25e\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_492f7f8398037558b5bd3ad25e\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_afdef1051380bd8f4228e68d01\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_93dcdf0169d3ba98dbe04edbc6\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_4554c20a65b38fe247ba9dcf3b\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b8bd836b488215bd133e9f0ef\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_f83f5910120dcca8491a6dc8bb\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_133ee7889033db2d951b3ed0f7\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_a97b2003defd6f8ba1ad4e3eca\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_5bc72498b59c83c7aaa1142936\` ON \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_1582bfd88329b634a25e6e3d90\` ON \`brand\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`DROP INDEX \`IDX_c637c8defee9868fff92463011\` ON \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe63bbba33798b2a5e7309d083\` ON \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_77690af1e50384a4ffab067dc0\` ON \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6b0c08d3a47dcb0b21278db5d\` ON \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_a4728f0c96533865e7a5d91f79\` ON \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_5917b4edf8bc300ca34486113f\` ON \`print_ad\``);
        await queryRunner.query(`DROP TABLE \`print_ad\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a0af31813a5ac50e534e73cd4\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_5082222ebdf20ac0b81bf2eab3\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_65b960eff0db597e8d8b84deb1\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_64432c8286ed0c1785e2ca13e2\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_98a828c4b3334fe75435d92f86\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_343a598e26be7afc36dcfdfa23\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_68100d14629614bb10adea7415\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_34dedd8e2ce2df3b74fed2a77e\` ON \`tvc\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa93318ac84bc718bf709c80c7\` ON \`tvc\``);
        await queryRunner.query(`DROP TABLE \`tvc\``);
    }

}
