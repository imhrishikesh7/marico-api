import { Injectable } from '@nestjs/common';
import { pressReleases } from 'src/dummy-data/press-releases-new/press-releases-new';
interface NewsContentBlock {
  type: 'paragraph' | 'subhead';
  value: string;
}

interface VideoData {
  src: string;
  alt: string;
  link: string;
}

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  year: string;
  month: string;
  image: string;
  slider: string[];
  video: VideoData;
  content: NewsContentBlock[];
  press_link: string;
  annexure_link: string;
}

@Injectable()
export class PressReleaseService {
    private pressReleases = pressReleases;

    getPressReleases(year?: string, month?: string, search?: string) {
      if (month === '0') month = ''; 
      if (year === '0') year = ''; 
    
      console.log("Filtering with:", { year, month, search });
    
      const result = (!year && !month && !search)
        ? this.pressReleases
        : this.pressReleases.filter((press) =>
            (!year || press.year === year) &&
            (!month || press.month === month) &&
            (!search || press.title.toLowerCase().includes(search.toLowerCase()))
        );
    
      return {
        success: true,
        message: "Request successful",
        data: result,
      };
    }
    
    
  
  getPressDetails(id: string) {
    return this.pressReleases.find((press:NewsItem) => press.id === id);
  }
}