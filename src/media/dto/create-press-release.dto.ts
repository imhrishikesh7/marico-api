export class CreatePressReleaseDto {
    media_title: string;
    subtitle: string;
    content: any[];
    media_regions: string[];
    release_date: string;
    external_link: string;
    kv_image: {
        url: string;
        width: number;
        height: number;
        alt: string;
    } | null;
    pressReleaseFile: {
        url: string;
    } | null;
    annexureFile: {
        url: string;
    } | null;
    sort_order: number;
    is_latest: boolean;
}           