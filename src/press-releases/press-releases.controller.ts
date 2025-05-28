import { Body, Controller, Delete, Get, Param, Patch, Post, Query, VERSION_NEUTRAL } from '@nestjs/common';
import { PressReleaseService } from './press-releases.service';
import { SpotlightService } from './spotlight.service';
import { CreatePressReleaseDto } from 'src/media/dto/create-press-release.dto';
import { UpdatePressReleaseDto } from 'src/media/dto/update-press-release.dto';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'press-release',
})
export class PressReleaseController {
  constructor(
    private readonly pressReleaseService: PressReleaseService,
    private readonly spotlightService: SpotlightService,
  ) {}

  @Get('new')
  getPressReleases(
    @Query('year') year?: string,
    @Query('month') month?: string,
    @Query('search') search?: string,
  ) {
    // This now calls the new filtered DB query method
    return this.pressReleaseService.findFiltered(year, month, search);
  }

  @Get('spotlight')
  getSpotlight(
    @Query('year') year?: string,
    @Query('month') month?: string,
    @Query('search') search?: string,
  ) {
    return this.spotlightService.getSpotlights(year, month, search);
  }

  @Get('spotlight/:id')
  getSpotlightDetails(@Param('id') id: string) {
    return this.spotlightService.getSpotlightDetails(id);
  }

  @Get(':id')
  getPressDetails(@Param('id') id: string) {
    // Parse ID as number because the new DB service expects a number
    return this.pressReleaseService.findOne(+id);
  }
  @Post()
createPressRelease(@Body() dto: CreatePressReleaseDto) {
  return this.pressReleaseService.create(dto);
}

@Patch(':id')
updatePressRelease(@Param('id') id: string, @Body() dto: UpdatePressReleaseDto) {
  return this.pressReleaseService.update(+id, dto);
}

@Delete(':id')
deletePressRelease(@Param('id') id: string) {
  return this.pressReleaseService.remove(+id);
}

}


// import { Controller, Get, Param, Query, VERSION_NEUTRAL } from "@nestjs/common";
// import { PressReleaseService } from "./press-releases.service";
// import { SpotlightService } from "./spotlight.service"; // Import SpotlightService

// @Controller({
//   version: VERSION_NEUTRAL,
//   path: "press-release",
// })
// export class PressReleaseController {
//   constructor(
//     private readonly pressReleaseService: PressReleaseService,
//     private readonly spotlightService: SpotlightService // Inject SpotlightService
//   ) {}

//   @Get("new")
//   getPressReleases(
//     @Query("year") year?: string, 
//     @Query("month") month?: string, 
//     @Query("search") search?: string) {
//     return this.pressReleaseService.getPressReleases(year, month, search);
//   }
  
//   @Get("spotlight")
//   getSpotlight(
//     @Query("year") year?: string,
//     @Query("month") month?: string,
//     @Query("search") search?: string
//   ) {
//     return this.spotlightService.getSpotlights(year, month, search);
//   }
  
//   @Get("spotlight/:id")
//   getSpotlightDetails(@Param("id") id: string) {
//     return this.spotlightService.getSpotlightDetails(id);
//   }

//   @Get(":id")
//   getPressDetails(@Param("id") id: string) {
//     return this.pressReleaseService.getPressDetails(id);
//   }
// }
