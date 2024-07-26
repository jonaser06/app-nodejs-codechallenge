import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { Agent } from "https";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { envs } from "src/common";

import { TransactionSystemClient } from "src/service/domain/transaction-system/transaction-system.client";
import { HttpTransactionSystemError } from "src/service/domain/error/http-transaction-system.error";
import { Logger } from "winston";



@Injectable()
export class HttpTransactionSystemClient implements TransactionSystemClient {
  private readonly url: string;
  private agent = new Agent({
    rejectUnauthorized: false
  })
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {
    this.url = envs.baseUrl;
  }

  async getTransaction(id: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.url}/transaction/${id}`, 
        { httpsAgent: this.agent }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en HttpTransactionSystemClient - getTransaction`, error.stack);
      throw new HttpTransactionSystemError("Http Transaction System Client Error");
    }
  }

  async createTransaction(data: any) {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.url}/transaction`,
        data,
        { httpsAgent: this.agent }
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en HttpTransactionSystemClient - createTransaction`, error.stack);
      throw new HttpTransactionSystemError("Http Transaction System Client Error");
    }
  }

}