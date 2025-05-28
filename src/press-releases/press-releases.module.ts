import { Module } from "@nestjs/common";
import { PressReleaseController } from "./press-releases.controller";
import { PressReleaseService } from "./press-releases.service";
import { SpotlightService } from "./spotlight.service";

@Module({
    controllers: [PressReleaseController],
    providers: [PressReleaseService, SpotlightService],
    exports: [SpotlightService],

})
export class PressReleasesModule {

}   