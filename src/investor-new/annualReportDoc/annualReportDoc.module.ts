import { Module } from "@nestjs/common";
import { AnnualReportDocController } from "./annualReportDoc.controller";
import { AnnualReportDocService } from "./annualReportDoc.service";

@Module({
    controllers:[AnnualReportDocController],
    providers:[AnnualReportDocService]
})
export class AnnualReportDocModule{}