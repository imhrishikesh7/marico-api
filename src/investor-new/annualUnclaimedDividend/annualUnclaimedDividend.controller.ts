import { Controller, Get, Param, VERSION_NEUTRAL } from "@nestjs/common";
import { AnnualUnclaimedDividentService } from "./annualUnclaimedDividend.service";
import { AnnualUnclaimedDoc } from "data/investor-new/annual-unclaimed-divident";

@Controller({
    version:VERSION_NEUTRAL,
    path:"annualUnclaimedDividend"
})
export class AnnualUnclaimedDividendController{
    constructor (private readonly data: AnnualUnclaimedDividentService){}

    @Get()
    getAll():AnnualUnclaimedDoc[]{
        return this.data.findAll()
    }
    @Get(':year')
    getByYear(@Param('year') year:string):AnnualUnclaimedDoc[]{
        return this.data.findByYear(year);
    }

}