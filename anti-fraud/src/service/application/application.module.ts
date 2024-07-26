import { Module } from "@nestjs/common";
import { AntifraudService } from "./antifraud.service";
import { ClientsModule } from "../clients/clients.module";

@Module({
  imports: [
    ClientsModule
  ],
  providers: [
    AntifraudService
  ],
  exports: [
    AntifraudService
  ]
})

export class ApplicationModule {}