import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Producer } from "kafkajs";
import { envs } from "src/common";
import { KafkaInterface } from "src/service/domain/kafka/kafka.interface";
import { PsTransactionRepository } from "../repositories/ps-transaction.repository";
import { TYPES } from "src/common/types";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { KafkaError } from "src/service/domain/error/kafka/kafka.error";

@Injectable()
export class KafkaService implements KafkaInterface {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    @Inject(TYPES.PsTransactionRepository)
    private readonly psTransactionRepository: PsTransactionRepository
  ) {
    const { kafkaHost, clientId, groupId } = envs;
    this.kafka = new Kafka({
      clientId: clientId,
      brokers: [ kafkaHost ],
    })

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId });
    this.logger.info("📫 KafkaService initialized");
  }

  async sendMessage(topic: string, messages: any): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages: [
          { value: JSON.stringify(messages) },
        ],
      });
      this.logger.info("📫 KafkaService message sent", messages);
      await this.producer.disconnect();
    } catch (error) {
      this.logger.error("An error occurred while sending the message", error.stack);
      throw new KafkaError("An error occurred while sending the message");
    }
  }

  async consumeMessages(topic: string ): Promise<void> {
    try {
      await this.consumer.subscribe({ topic });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          const messageValue = message.value.toString();
          const { transactionExternalId, status } = JSON.parse(messageValue);
          this.logger.info("📫 KafkaService message received", { transactionExternalId, status });
          await this.psTransactionRepository.updateOne(transactionExternalId, status);
        },
      });
    } catch (error) {
      this.logger.error("An error occurred while consuming the message", error.stack);
      throw new KafkaError("An error occurred while consuming the message");
    }

  }
}