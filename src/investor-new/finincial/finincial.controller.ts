import { Controller, Get, Param, VERSION_NEUTRAL } from "@nestjs/common";
import { FinincialService } from "./finincial.service";
import { Financial } from "data/investor-new/finincial";

@Controller({
    version:VERSION_NEUTRAL,
    path:'finincial',
})
export class FinincialController{
    constructor (private readonly finincialService:FinincialService){}

    @Get()
    findAll(): Financial[] {
        return this.finincialService.findAll(); 
    }

    @Get(':id')
    findById(@Param('id') id: string):Financial[]{
        return this.finincialService.findById(Number(id));
    }
}