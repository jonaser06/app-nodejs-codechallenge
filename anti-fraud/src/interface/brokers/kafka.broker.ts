import { Injectable, OnModuleInit } from "@nestjs/common";
import { envs } from "src/common";
import { AntifraudService } from "src/service/application/antifraud.service";

@Injectable()
export class KafkaBroker implements OnModuleInit{

  constructor(
    private readonly AntifraudService: AntifraudService,
  ) {

  }

  async onModuleInit() {
    await this.AntifraudService.receive(envs.topicAntifraud);
    console.log("📫 Broker initialized");
  }
}