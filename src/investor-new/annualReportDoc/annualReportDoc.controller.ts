import { Controller, Get, Param, VERSION_NEUTRAL } from "@nestjs/common";
import { AnnualReportDoc } from "data/investor-new/annual-report-docs";
import { AnnualReportDocService } from "./annualReportDoc.service";

@Controller({
    version: VERSION_NEUTRAL,
    path:"annualReportDoc"
})
export class AnnualReportDocController{
    constructor (private readonly annualreportDocService: AnnualReportDocService){}

    @Get()
    getAllReportDoc():AnnualReportDoc[]{
        return this.annualreportDocService.findAll();
    }
    @Get(':year')
    getAllReportDocByYear(@Param('year') year:string):AnnualReportDoc[]{
        return this.annualreportDocService.findByYear(year);
    }
}