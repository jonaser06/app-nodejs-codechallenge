import { Module } from "@nestjs/common";
import { TYPES } from "src/common/types";
import { KafkaService } from "./kafka/kafka.service";

@Module({
  imports: [],
  providers: [
    {
      provide: TYPES.KafkaService,
      useClass: KafkaService
    }
  ],
  exports: [
    {
      provide: TYPES.KafkaService,
      useClass: KafkaService
    }
  ]
})

export class ClientsModule {}