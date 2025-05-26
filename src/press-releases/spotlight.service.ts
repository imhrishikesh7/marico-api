import { Injectable } from "@nestjs/common";
import { spotlight } from "src/dummy-data/press-releases-new/in-the-spotlight";

@Injectable()
export class SpotlightService {
  private spotlight = spotlight;

  constructor() {
  }


  getSpotlights(year?: string, month?: string, search?: string) {
    if (year === "0") year = undefined;
    if (month === "0") month = undefined;
    if (search === "0") search = undefined;
  
    const result = this.spotlight.filter((spot) => {
      const yearMatch = !year || spot.year === year;
      const monthMatch = !month || spot.month === month;
      const searchMatch = !search || spot.title.toLowerCase().includes(search.toLowerCase());
      return yearMatch && monthMatch && searchMatch;
    });
  
    return {
      success: true,
      message: "Request successful",
      data: result,
    };
  }

  getSpotlightDetails(id: string) {
    return this.spotlight.find((spotlight) => spotlight.id === id);
  }
}
