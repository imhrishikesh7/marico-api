import { Module } from "@nestjs/common";
import { AnnualReportController } from "./annualReport.controller";
import { AnnualReportService } from "./annualReport.service";

@Module({
    controllers:[AnnualReportController],
    providers:[AnnualReportService]
})
export class AnnualReportModule{}