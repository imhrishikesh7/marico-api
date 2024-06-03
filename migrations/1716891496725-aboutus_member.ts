import { MigrationInterface, QueryRunner } from "typeorm";

export class AboutusMember1716891496725 implements MigrationInterface {
    name = 'AboutusMember1716891496725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`aboutus_member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` json NOT NULL, \`position\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`thumbnail\` json NULL, \`is_active\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_408f251deaa301470961d2b326\` (\`name\`), INDEX \`IDX_c4caf4963bde6d5cd1054e2a27\` (\`position\`), INDEX \`IDX_42f6099356d43306c4e92366bd\` (\`is_active\`), INDEX \`IDX_827d1cf8d12ded067207d97285\` (\`created_at\`), INDEX \`IDX_4c0ef67422d9258270eb528088\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4c0ef67422d9258270eb528088\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_827d1cf8d12ded067207d97285\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_42f6099356d43306c4e92366bd\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_c4caf4963bde6d5cd1054e2a27\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP INDEX \`IDX_408f251deaa301470961d2b326\` ON \`aboutus_member\``);
        await queryRunner.query(`DROP TABLE \`aboutus_member\``);
    }

}
