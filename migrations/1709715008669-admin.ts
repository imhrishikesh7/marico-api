import { CryptoService } from 'src/lib/utility';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1709715008669 implements MigrationInterface {
  name = 'Admin1709715008669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` json NOT NULL, \`landing_url\` varchar(255) NOT NULL, \`is_super_admin\` tinyint NOT NULL DEFAULT 0, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6332d49442bb1453535dd0c258\` (\`is_active\`), INDEX \`IDX_3e267a94bab0461665be604cb1\` (\`created_at\`), INDEX \`IDX_df1c1728197f53438461be18c2\` (\`updated_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`unique_id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varbinary(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role_id\` int NOT NULL, INDEX \`IDX_b23910d3460e1e59e0d6341fca\` (\`unique_id\`), INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), INDEX \`IDX_407c6798fe20fd5d75de4a233c\` (\`password\`), INDEX \`IDX_6416b95e87960c38b3aaa0d95d\` (\`is_active\`), INDEX \`IDX_18a526eed6201b82869f21c2d4\` (\`created_at\`), INDEX \`IDX_8ec0b7b9ff0a46ac0a77f38aaf\` (\`updated_at\`), INDEX \`IDX_fd32421f2d93414e46a8fcfd86\` (\`role_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin_activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`admin_id\` int NOT NULL, \`activity_type\` varchar(255) NOT NULL, \`activity_ref\` varchar(255) NOT NULL, \`activity\` varchar(255) NOT NULL, \`data\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_a839db0fc7db17b170b8563cb0\` (\`admin_id\`), INDEX \`IDX_c0b2d2ac6559264b4824983cfa\` (\`activity_type\`), INDEX \`IDX_08c8eff47596939177126429c6\` (\`activity_ref\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admin\` ADD CONSTRAINT \`FK_fd32421f2d93414e46a8fcfd86b\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admin_activity\` ADD CONSTRAINT \`FK_a839db0fc7db17b170b8563cb08\` FOREIGN KEY (\`admin_id\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    //insert sample data
    await queryRunner.query(
      `INSERT INTO \`role\` (\`id\`, \`name\`, \`permissions\`, \`is_super_admin\`, \`landing_url\`) VALUES (1, 'Super Admin', '[]', 1, '/')`,
    );

    await queryRunner.query(
      `INSERT INTO \`admin\` (\`id\`, \`name\`, \`email\`, \`password\`, \`is_active\`, \`role_id\`, \`unique_id\`) VALUES (1, 'Sample Admin', '${CryptoService.encrypt(
        'sample@jetbro.in',
      )}', '${CryptoService.hashPassword(
        'sample',
      )}', 1, 1, '6ecb968b-c2c0-4554-9923-f339fd96cf81')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`admin\` WHERE \`id\` = 1`);
    await queryRunner.query(`DELETE FROM \`role\` WHERE \`id\` = 1`);
    await queryRunner.query(
      `ALTER TABLE \`admin_activity\` DROP FOREIGN KEY \`FK_a839db0fc7db17b170b8563cb08\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`admin\` DROP FOREIGN KEY \`FK_fd32421f2d93414e46a8fcfd86b\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_08c8eff47596939177126429c6\` ON \`admin_activity\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c0b2d2ac6559264b4824983cfa\` ON \`admin_activity\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a839db0fc7db17b170b8563cb0\` ON \`admin_activity\``,
    );
    await queryRunner.query(`DROP TABLE \`admin_activity\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fd32421f2d93414e46a8fcfd86\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8ec0b7b9ff0a46ac0a77f38aaf\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_18a526eed6201b82869f21c2d4\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6416b95e87960c38b3aaa0d95d\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_407c6798fe20fd5d75de4a233c\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b23910d3460e1e59e0d6341fca\` ON \`admin\``,
    );
    await queryRunner.query(`DROP TABLE \`admin\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_df1c1728197f53438461be18c2\` ON \`role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3e267a94bab0461665be604cb1\` ON \`role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6332d49442bb1453535dd0c258\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
