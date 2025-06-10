import { Controller, Get, Param, VERSION_NEUTRAL } from "@nestjs/common";
import { UnclaimedDividendService } from "./unclaimedDividend.service";
import { UnclaimedDoc } from "data/investor-new/unclaimed-dividend";

@Controller({
    version:VERSION_NEUTRAL,
    path:"unclaimedDividend"
})
export class UnclaimedDividendController{
    constructor (private readonly data: UnclaimedDividendService){}

    @Get()
    getAll():UnclaimedDoc[]{
        return this.data.findAll()
    }
    @Get(':year')
    getByYear(@Param('year') year:string):UnclaimedDoc[]{
        return this.data.findByYear(year);
    }

}