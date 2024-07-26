import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "src/common/types";
import { PsTransactionRepository } from "../clients/repositories/ps-transaction.repository";
import { TransactionStatus } from "src/common/constants";
import { KafkaService } from "../clients/kafka/kafka.service";

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TYPES.PsTransactionRepository)
    private readonly transactionRepository: PsTransactionRepository,
    @Inject(TYPES.KafkaService)
    private readonly kafkaService: KafkaService
  ) { }
  async createTransaction(data) {
    console.log(data);
    return await this.transactionRepository.create({
      ...data,
      transactionStatus: TransactionStatus.PENDING,
    });
  }
  async getTransaction(id) {
    return await this.transactionRepository.findOne(id);
  }

  async sendMessage(topic: string, messages: any): Promise<void> {
    await this.kafkaService.sendMessage(topic, messages);
  }

  async receive(topic: string) : Promise<void> {
    await this.kafkaService.consumeMessages(topic);
  }
}