import { Injectable } from "@nestjs/common";
import { shareholding, Shareholding } from "data/investor-new/shareholding-pattern";

@Injectable()
export class ShareHoldingPatternService{
    findAll(): Shareholding[]{
        return shareholding
    }
    findByYear(year:string):Shareholding[]{
        return shareholding.filter(data=>data.year===year);
    }
}