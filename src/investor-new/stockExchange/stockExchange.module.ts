import { Module } from "@nestjs/common";
import { StockExchangeController } from "./stockExchange.controller";
import { StockExchangeService } from "./stockExchange.service";

@Module({
    controllers:[StockExchangeController],
    providers:[StockExchangeService]
})
export class StockExchangeModule{}