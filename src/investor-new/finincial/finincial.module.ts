import { Module } from "@nestjs/common";
import { FinincialController } from "./finincial.controller";
import { FinincialService } from "./finincial.service";


@Module({
    controllers:[FinincialController],
    providers:[FinincialService]
})
export class FinincialModule{}