import { Module } from "@nestjs/common";
import { TYPES } from "src/common/types";
import { PsTransactionRepository } from "./repositories/ps-transaction.repository";
import { PrismaClient } from "@prisma/client";
import { KafkaService } from "./kafka/kafka.service";

@Module({
  imports: [],
  providers: [
    PrismaClient,
    {
      provide: TYPES.PsTransactionRepository,
      useClass: PsTransactionRepository
    },
    {
      provide: TYPES.KafkaService,
      useClass: KafkaService
    }
  ],
  exports: [
    {
      provide: TYPES.PsTransactionRepository,
      useClass: PsTransactionRepository
    },
    {
      provide: TYPES.KafkaService,
      useClass: KafkaService
    }
  ]
})

export class ClientsModule {}