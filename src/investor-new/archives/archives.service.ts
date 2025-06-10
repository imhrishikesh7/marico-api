import { Injectable } from "@nestjs/common";
import { archives, Archives } from "data/investor-new/archives";

@Injectable()
export class ArchivesService{
    findAll():Archives[]{
        return archives
    }
}