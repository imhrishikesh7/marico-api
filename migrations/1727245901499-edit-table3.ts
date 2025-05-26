import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTable31727245901499 implements MigrationInterface {
    name = 'EditTable31727245901499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_share_holder\` CHANGE \`investors_shi_pdf\` \`investors_shi_pdf\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_share_holder\` CHANGE \`investors_shi_pdf\` \`investors_shi_pdf\` text NULL`);
    }

}
