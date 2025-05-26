import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDummyMediaNewData1710000000001 implements MigrationInterface {
    name = 'AddDummyMediaNewData1710000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add dummy press releases
        await queryRunner.query(`
            INSERT INTO "press_release" (
                "media_title", "author", "publisher_name", "subtitle", 
                "media_regions", "release_date", "external_link", "kv_image",
                "pressReleaseFile", "annexureFile", "sort_order", "is_latest"
            ) VALUES 
            (
                'Marico Announces Q4 Results',
                'John Doe',
                'Business Standard',
                'Strong growth in domestic business',
                '["global", "india"]',
                '2024-03-15',
                'https://example.com/press1',
                '{"url": "https://example.com/images/press1.jpg", "width": 800, "height": 600, "alt": "Q4 Results"}',
                '{"url": "https://example.com/files/press1.pdf"}',
                '{"url": "https://example.com/files/press1-annexure.pdf"}',
                1,
                true
            ),
            (
                'Marico Expands into New Markets',
                'Jane Smith',
                'Economic Times',
                'Strategic expansion in Southeast Asia',
                '["global", "india", "bangladesh"]',
                '2024-03-10',
                'https://example.com/press2',
                '{"url": "https://example.com/images/press2.jpg", "width": 800, "height": 600, "alt": "Market Expansion"}',
                '{"url": "https://example.com/files/press2.pdf"}',
                null,
                2,
                false
            )
        `);

        // Add dummy spotlights
        await queryRunner.query(`
            INSERT INTO "spotlight" (
                "media_title", "author", "publisher_name", "subtitle", 
                "media_regions", "release_date", "external_link", "kv_image",
                "video", "sort_order", "is_latest"
            ) VALUES 
            (
                'Marico''s Sustainability Journey',
                'Alice Johnson',
                'Sustainability Today',
                'Leading the way in sustainable business practices',
                '["global"]',
                '2024-03-20',
                'https://example.com/spotlight1',
                '{"url": "https://example.com/images/spotlight1.jpg", "width": 800, "height": 600, "alt": "Sustainability"}',
                '{"url": "https://example.com/videos/spotlight1.mp4"}',
                1,
                true
            ),
            (
                'Innovation at Marico',
                'Bob Wilson',
                'Innovation Weekly',
                'Pioneering new products and technologies',
                '["global", "india"]',
                '2024-03-18',
                'https://example.com/spotlight2',
                '{"url": "https://example.com/images/spotlight2.jpg", "width": 800, "height": 600, "alt": "Innovation"}',
                '{"url": "https://example.com/videos/spotlight2.mp4"}',
                2,
                false
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "press_release"`);
        await queryRunner.query(`DELETE FROM "spotlight"`);
    }
} 