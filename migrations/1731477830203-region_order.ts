import { MigrationInterface, QueryRunner } from "typeorm";

export class RegionOrder1731477830203 implements MigrationInterface {
    name = 'RegionOrder1731477830203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`query_type\` varchar(255) NOT NULL, \`query\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_8c17e6f04bd3fdd6053f3e7ebe\` (\`name\`), INDEX \`IDX_f9f62556c7092913f2a0697505\` (\`phone\`), INDEX \`IDX_eff09bb429f175523787f46003\` (\`email\`), INDEX \`IDX_3c954ab52df6af830a87b06811\` (\`address\`), INDEX \`IDX_2e5ece210d6336cb87deec3329\` (\`query_type\`), INDEX \`IDX_abf4e0e4c5bd2e8e23605a1646\` (\`query\`), INDEX \`IDX_5655225a1b5dc278f91511bfe5\` (\`created_at\`), INDEX \`IDX_1611bff648370477d5d0a6156c\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`region\` ADD \`sort_order\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_c4e68dbb0cc55ff94db98f41b9\` ON \`region\` (\`sort_order\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c4e68dbb0cc55ff94db98f41b9\` ON \`region\``);
        await queryRunner.query(`ALTER TABLE \`region\` DROP COLUMN \`sort_order\``);
        await queryRunner.query(`DROP INDEX \`IDX_1611bff648370477d5d0a6156c\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_5655225a1b5dc278f91511bfe5\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_abf4e0e4c5bd2e8e23605a1646\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_2e5ece210d6336cb87deec3329\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c954ab52df6af830a87b06811\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_eff09bb429f175523787f46003\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9f62556c7092913f2a0697505\` ON \`contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c17e6f04bd3fdd6053f3e7ebe\` ON \`contact\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
    }

}
