import { Controller, Get, Param, VERSION_NEUTRAL } from "@nestjs/common";

import { UnclaimedDoc } from "data/investor-new/unclaimed-dividend";
import { TransferSharesService } from "./transferShares.service";

@Controller({
    version:VERSION_NEUTRAL,
    path:"transferShares"
})
export class TransferSharesController{
    constructor (private readonly data: TransferSharesService){}

    @Get()
    getAll():UnclaimedDoc[]{
        return this.data.findAll()
    }
    @Get(':year')
    getByYear(@Param('year') year:string):UnclaimedDoc[]{
        return this.data.findByYear(year);
    }

}