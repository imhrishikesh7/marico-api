import { MigrationInterface, QueryRunner } from 'typeorm';

export class Memberorder1736426693374 implements MigrationInterface {
  name = 'Memberorder1736426693374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`aboutus_member\` ADD \`sort_order\` int NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_be66ffe3f3cee35dc0bd354747\` ON \`aboutus_member\``);
    await queryRunner.query(`ALTER TABLE \`aboutus_member\` DROP COLUMN \`sort_order\``);
  }
}
