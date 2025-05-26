import { MigrationInterface, QueryRunner } from "typeorm";

export class ActiveEdit1733319216516 implements MigrationInterface {
    name = 'ActiveEdit1733319216516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`investor_share_holder\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`information_update\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_placement\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_dr\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_psi\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_mi\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`investor_contact\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`CREATE INDEX \`IDX_4c99379ee80f96f870bbbf1ad6\` ON \`investor_share_holder\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_14ca7e49b37881d88d2013621f\` ON \`information_update\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_3e92c389030402b781ca060d74\` ON \`investor_placement\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_cc3cf87f43a7a8b9d8aa2a235a\` ON \`investor_schedule\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e7f15b2f2c7cca63c4bbca4e49\` ON \`quartely_update\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_542d6e88a0275351e68fc1a503\` ON \`investor_dr\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_5de1914a83998a8a38b21c097d\` ON \`investor_psi\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_b9639e85e9c54be3fb2d9fd228\` ON \`investor_mi\` (\`is_active\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_b11b96032ece59d28e07b37f42\` ON \`investor_contact\` (\`is_active\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b11b96032ece59d28e07b37f42\` ON \`investor_contact\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9639e85e9c54be3fb2d9fd228\` ON \`investor_mi\``);
        await queryRunner.query(`DROP INDEX \`IDX_5de1914a83998a8a38b21c097d\` ON \`investor_psi\``);
        await queryRunner.query(`DROP INDEX \`IDX_542d6e88a0275351e68fc1a503\` ON \`investor_dr\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7f15b2f2c7cca63c4bbca4e49\` ON \`quartely_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_cc3cf87f43a7a8b9d8aa2a235a\` ON \`investor_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e92c389030402b781ca060d74\` ON \`investor_placement\``);
        await queryRunner.query(`DROP INDEX \`IDX_14ca7e49b37881d88d2013621f\` ON \`information_update\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c99379ee80f96f870bbbf1ad6\` ON \`investor_share_holder\``);
        await queryRunner.query(`ALTER TABLE \`investor_contact\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_mi\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_psi\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_dr\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`quartely_update\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_schedule\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_placement\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`information_update\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`investor_share_holder\` DROP COLUMN \`is_active\``);
    }

}
