import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMediaNewTables1710000000000 implements MigrationInterface {
    name = 'CreateMediaNewTables1710000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "press_release" (
                "id" SERIAL NOT NULL,
                "media_title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "publisher_logo" character varying NOT NULL,
                "publisher_name" character varying NOT NULL,
                "subtitle" character varying NOT NULL,
                "media_regions" text NOT NULL,
                "release_date" TIMESTAMP NOT NULL,
                "external_link" character varying NOT NULL,
                "kv_image" json,
                "pressReleaseFile" json,
                "annexureFile" json,
                "sort_order" integer NOT NULL,
                "is_latest" boolean NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_press_release" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "spotlight" (
                "id" SERIAL NOT NULL,
                "media_title" character varying NOT NULL,
                "author" character varying NOT NULL,
                "publisher_logo" character varying NOT NULL,
                "publisher_name" character varying NOT NULL,
                "subtitle" character varying NOT NULL,
                "media_regions" text NOT NULL,
                "release_date" TIMESTAMP NOT NULL,
                "external_link" character varying NOT NULL,
                "kv_image" json,
                "video" json,
                "sort_order" integer NOT NULL,
                "is_latest" boolean NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_spotlight" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "IDX_press_release_media_title" ON "press_release" ("media_title")`);
        await queryRunner.query(`CREATE INDEX "IDX_press_release_release_date" ON "press_release" ("release_date")`);
        await queryRunner.query(`CREATE INDEX "IDX_spotlight_media_title" ON "spotlight" ("media_title")`);
        await queryRunner.query(`CREATE INDEX "IDX_spotlight_release_date" ON "spotlight" ("release_date")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "press_release"`);
        await queryRunner.query(`DROP TABLE "spotlight"`);
    }
} 