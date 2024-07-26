import { Inject, Injectable } from "@nestjs/common";
import { TYPES } from "src/common/types";
import { KafkaService } from "../clients/kafka/kafka.service";
import { envs } from "src/common";

@Injectable()
export class AntifraudService {
  constructor(
    @Inject(TYPES.KafkaService)
    private readonly kafkaService: KafkaService,
  ) {}

  async receive(topic: string): Promise<void> {
    await this.kafkaService.consumeMessages(topic);
  }
}