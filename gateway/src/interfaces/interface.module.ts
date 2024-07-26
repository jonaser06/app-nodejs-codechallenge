import { Module } from "@nestjs/common";
import { GatewayController } from "./controllers/gateway.controller";
import { ApplicationModule } from "src/service/application/application.module";

@Module({
  controllers: [
    GatewayController,
  ],
  imports: [
    ApplicationModule
  ]
})

export class InterfaceModule {}