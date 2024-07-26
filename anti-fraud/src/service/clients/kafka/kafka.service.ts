import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Consumer, Kafka, Logger, Producer } from "kafkajs";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { envs } from "src/common";
import { TransactionStatus } from "src/common/constants";
import { KafkaError } from "src/service/domain/error/kafka/kafka.error";
import { KafkaInterface } from "src/service/domain/kafka/kafka.interface";

@Injectable()
export class KafkaService implements KafkaInterface {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
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
          { value: JSON.stringify(messages) }
        ],
      });
      this.logger.info("📫 KafkaService message sent", messages);
      await this.producer.disconnect();
    } catch (error) {
      this.logger.error("An error occurred while sending the message", error.stack);
      throw new KafkaError("An error occurred while sending the message");
    }

  }

  async consumeMessages(topic: string): Promise<any> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic });
      this.consumer.run({
        eachMessage: async ({message}) => {
          const messageValue = message.value.toString();
          this.logger.info("📫 KafkaService message received", { messageValue });
          await this.send(envs.topicTransaction, messageValue);
        },
      });
    } catch (error) {
      this.logger.error("An error occurred while consuming the message", error.stack);
      throw new KafkaError("An error occurred while consuming the message");
    }

  }

  private async send(topic: string, messages: any): Promise<void> {
    const { transactionExternalId, value } = JSON.parse(messages);
    const message = { 
      transactionExternalId, 
      status: 
        value > 1000 
        ? TransactionStatus.REJECTED 
        : TransactionStatus.APPROVED 
    };

    await this.sendMessage(topic, message);
  }
}