import { Injectable, OnModuleInit } from "@nestjs/common";
import { envs } from "src/common";
import { TransactionService } from "src/service/application/transaction.service";

@Injectable()
export class KafkaBroker implements OnModuleInit{

  constructor(
    private readonly transactionService: TransactionService,
  ) {

  }

  async onModuleInit() {
    await this.transactionService.receive(envs.topicTransaction);
    console.log("📫 Broker initialized");
  }
}