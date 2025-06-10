import { Module } from "@nestjs/common";
import { DisclosureController } from "./disclosure.controller";
import { DisclosureService } from "./disclosure.service";

@Module({
    controllers:[DisclosureController],
    providers:[DisclosureService]
})
export class DisclosureModule{}