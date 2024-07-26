import { Module } from "@nestjs/common";
import { ClientsModule } from "../clients/clients.module";
import { GatewayService } from "./gateway.service";

@Module({
  imports: [
    ClientsModule
  ],
  providers: [
    GatewayService
  ],
  exports: [
    GatewayService
  ]
})

export class ApplicationModule {}