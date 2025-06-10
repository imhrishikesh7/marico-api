import { Injectable } from "@nestjs/common";
import { disclosure, Disclosure } from "data/investor-new/disclosute";

@Injectable()
export class DisclosureService{
    findAll():Disclosure[]{
        return disclosure;
    }
    findById(id:Number):Disclosure[]{
        return disclosure.filter(data=>data.id===id);
    }
}