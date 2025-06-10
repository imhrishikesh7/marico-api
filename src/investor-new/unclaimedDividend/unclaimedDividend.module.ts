import { Module } from "@nestjs/common";
import { UnclaimedDividendController } from "./unclaimedDividend.controller";
import { UnclaimedDividendService } from "./unclaimedDividend.service";

@Module({
    controllers:[UnclaimedDividendController],
    providers:[UnclaimedDividendService],
})

export class UnclaimedDividendModule{}