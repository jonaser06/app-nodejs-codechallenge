import { Module } from "@nestjs/common";
import { ApplicationModule } from "src/service/application/application.module";
import { TransactionController } from "./controllers/transaction.controller";
import { KafkaBroker } from "./brokers/kafka.broker";

@Module({
  controllers: [
    TransactionController
  ],
  imports: [
    ApplicationModule
  ],
  providers: [
    KafkaBroker
  ]
})

export class InterfaceModule {}