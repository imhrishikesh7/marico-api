import { Injectable } from '@nestjs/common';
import { pressReleases } from '../../data/press-releases-new/press-releases-new';

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
    return this.pressReleases.find((press) => press.id === id);
  }
}