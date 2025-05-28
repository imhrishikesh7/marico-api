import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable21727238471118 implements MigrationInterface {
    name = 'EditTable21727238471118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_706bae1563711a2356c4978170\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_f85be9f7b42b8417b50bb4bfac\` ON \`page_content\``);
        await queryRunner.query(`CREATE TABLE \`page\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`indexed\` tinyint NOT NULL, \`meta_title\` varchar(255) NOT NULL, \`meta_description\` text NOT NULL, \`meta_image\` json NULL, \`canonical_override\` varchar(255) NOT NULL, \`published_at\` timestamp NOT NULL, \`is_active\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b82c19c08afb292de4600d99e4\` (\`name\`), INDEX \`IDX_0341783b6f06a913c11fc88402\` (\`is_active\`), INDEX \`IDX_ca2cb8f41c7b9f0fa02b0a9fa1\` (\`created_at\`), INDEX \`IDX_dbe6a4169a3ef150e71daf201c\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`page_ref_id\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`page_ref\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`page_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`reference_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`component_type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`order\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` CHANGE \`content\` \`content\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_1955174845bb55bbffdc3eac82\` ON \`page_content\` (\`page_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_b92f2a73e01b0687efe1ad98b9\` ON \`page_content\` (\`reference_name\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_6d9783fdc7738a1268a894871f\` ON \`page_content\` (\`created_at\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_07794f1f687e572466e12cfa78\` ON \`page_content\` (\`updated_at\`)`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD CONSTRAINT \`FK_1955174845bb55bbffdc3eac826\` FOREIGN KEY (\`page_id\`) REFERENCES \`page\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP FOREIGN KEY \`FK_1955174845bb55bbffdc3eac826\``);
        await queryRunner.query(`DROP INDEX \`IDX_07794f1f687e572466e12cfa78\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d9783fdc7738a1268a894871f\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_b92f2a73e01b0687efe1ad98b9\` ON \`page_content\``);
        await queryRunner.query(`DROP INDEX \`IDX_1955174845bb55bbffdc3eac82\` ON \`page_content\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`page_content\` CHANGE \`content\` \`content\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`component_type\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`reference_name\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` DROP COLUMN \`page_id\``);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`page_ref\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`page_content\` ADD \`page_ref_id\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_dbe6a4169a3ef150e71daf201c\` ON \`page\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca2cb8f41c7b9f0fa02b0a9fa1\` ON \`page\``);
        await queryRunner.query(`DROP INDEX \`IDX_0341783b6f06a913c11fc88402\` ON \`page\``);
        await queryRunner.query(`DROP INDEX \`IDX_b82c19c08afb292de4600d99e4\` ON \`page\``);
        await queryRunner.query(`DROP TABLE \`page\``);
        await queryRunner.query(`CREATE INDEX \`IDX_f85be9f7b42b8417b50bb4bfac\` ON \`page_content\` (\`page_ref\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_706bae1563711a2356c4978170\` ON \`page_content\` (\`page_ref_id\`)`);
    }

}
