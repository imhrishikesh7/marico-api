import { Injectable } from "@nestjs/common";
import { generalMeeting, GeneralMeeting } from "data/investor-new/general-meeting";

@Injectable()
export class GeneralMeetingService{
    findAll():GeneralMeeting[]{
        return generalMeeting;
    }
    
}