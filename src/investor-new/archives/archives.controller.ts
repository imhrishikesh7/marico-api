import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { ArchivesService } from "./archives.service";
import { Archives } from "data/investor-new/archives";

@Controller({
    version:VERSION_NEUTRAL,
    path:"archives"
})
export class ArchivesController{
    constructor (private readonly data: ArchivesService){}

    @Get()
    getAll():Archives[]{
        return this.data.findAll()
    }
}