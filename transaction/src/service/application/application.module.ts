import { Module } from "@nestjs/common";
import { ClientsModule } from "../clients/clients.module";
import { TransactionService } from "./transaction.service";

@Module({
  imports: [
    ClientsModule
  ],
  providers: [
    TransactionService,
  ],
  exports: [
    TransactionService,
  ]
})

export class ApplicationModule {}