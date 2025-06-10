import { Module } from "@nestjs/common";
import { GeneralMeetingController } from "./generalMeeting.controller";
import { GeneralMeetingService } from "./generalMeeting.service";

@Module({
    controllers:[GeneralMeetingController],
    providers:[GeneralMeetingService]
})
export class GeneralMeetingModule{}