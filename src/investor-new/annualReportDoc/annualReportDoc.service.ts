import { Injectable } from "@nestjs/common";
import { annualReportDoc, AnnualReportDoc } from "data/investor-new/annual-report-docs";

@Injectable()
    export class AnnualReportDocService{
        findAll():AnnualReportDoc[]{
            return annualReportDoc;
        }

        findByYear(year:string):AnnualReportDoc[]{
            return annualReportDoc.filter(data=>data.year===year);
        }
    }