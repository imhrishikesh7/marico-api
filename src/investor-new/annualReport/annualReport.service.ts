import { Injectable } from "@nestjs/common";
import { annualReport, AnnualReport } from "data/investor-new/annual-report";

@Injectable()
export class AnnualReportService{
    findAll(): AnnualReport[]{
        return annualReport;
    }
    findByYear(year: string):AnnualReport[]{
        return annualReport.filter(data=>data.year===year);
    }
}