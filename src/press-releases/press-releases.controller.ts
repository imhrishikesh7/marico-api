import { Controller, Get, Param, Query, VERSION_NEUTRAL } from "@nestjs/common";
import { PressReleaseService } from "./press-releases.service";
import { SpotlightService } from "./spotlight.service"; // Import SpotlightService

@Controller({
  version: VERSION_NEUTRAL,
  path: "press-release",
})
export class PressReleaseController {
  constructor(
    private readonly pressReleaseService: PressReleaseService,
    private readonly spotlightService: SpotlightService // Inject SpotlightService
  ) {}

  @Get("new")
  getPressReleases(@Query("year") year: string, @Query("month") month: string, @Query("search") search: string) {
    console.log("Search Query:", search);  // ✅ Debugging log
    return this.pressReleaseService.getPressReleases(year, month, search);
  }
  
  @Get("spotlight")
  getSpotlight(
    @Query("year") year?: string,
    @Query("month") month?: string,
    @Query("search") search?: string
  ) {
    return this.spotlightService.getSpotlights(year, month, search);
  }
  
  @Get("spotlight/:id")
  getSpotlightDetails(@Param("id") id: string) {
    return this.spotlightService.getSpotlightDetails(id);
  }

  @Get(":id")
  getPressDetails(@Param("id") id: string) {
    return this.pressReleaseService.getPressDetails(id);
  }
}
