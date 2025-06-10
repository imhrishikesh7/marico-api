import { Module } from "@nestjs/common";
import { ShareHoldingPatternController } from "./shareHoldingPattern.controller";
import { ShareHoldingPatternService } from "./shareHoldingPattern.service";

@Module({
    controllers:[ShareHoldingPatternController],
    providers:[ShareHoldingPatternService]
})
export class ShareHoldingPatternModule{}