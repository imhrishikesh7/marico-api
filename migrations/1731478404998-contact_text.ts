import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactText1731478404998 implements MigrationInterface {
    name = 'ContactText1731478404998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0f579f8884aa2292c0cd9bc1ec\` ON \`investor_contact\``);
        await queryRunner.query(`ALTER TABLE \`investor_contact\` DROP COLUMN \`ic_contact_info\``);
        await queryRunner.query(`ALTER TABLE \`investor_contact\` ADD \`ic_contact_info\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_contact\` DROP COLUMN \`ic_contact_info\``);
        await queryRunner.query(`ALTER TABLE \`investor_contact\` ADD \`ic_contact_info\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_0f579f8884aa2292c0cd9bc1ec\` ON \`investor_contact\` (\`ic_contact_info\`)`);
    }

}
