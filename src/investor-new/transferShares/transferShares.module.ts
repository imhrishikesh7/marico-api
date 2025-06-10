import { Module } from "@nestjs/common";

import { TransferSharesController } from "./transferShares.controller";
import { TransferSharesService } from "./transferShares.service";


@Module({
    controllers:[TransferSharesController],
    providers:[TransferSharesService],
})

export class TransferSharesModule{}