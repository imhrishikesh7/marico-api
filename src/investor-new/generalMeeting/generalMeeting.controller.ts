import { Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { GeneralMeetingService } from "./generalMeeting.service";
import { GeneralMeeting } from "data/investor-new/general-meeting";

@Controller({
    version:VERSION_NEUTRAL,
    path:"generalmeeting"
})

export class GeneralMeetingController{
    constructor (private readonly data:GeneralMeetingService){}

    @Get()
    getAll():GeneralMeeting[]{
        return this.data.findAll();
    }
}