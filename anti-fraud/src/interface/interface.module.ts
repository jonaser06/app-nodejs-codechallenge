import { Module } from "@nestjs/common";
import { ApplicationModule } from "src/service/application/application.module";
import { KafkaBroker } from "./brokers/kafka.broker";

@Module({
  imports: [
    ApplicationModule
  ],
  providers: [
    KafkaBroker,
  ],
})

export class InterfaceModule {}