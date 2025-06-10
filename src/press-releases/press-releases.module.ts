import { Module } from "@nestjs/common";
import { PressReleaseController } from "./press-releases.controller";
import { PressReleaseService } from "./press-releases.service";
import { SpotlightService } from "./spotlight.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PressRelease } from "src/media/entities/press-release.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PressRelease])],
    controllers: [PressReleaseController],
    providers: [PressReleaseService, SpotlightService],
    exports: [SpotlightService],

})
export class PressReleasesModule {

}   