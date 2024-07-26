import { Inject, Injectable } from "@nestjs/common";
import { HttpTransactionSystemClient } from "../clients/transaction-system/http-transaction-system.client";
import { TYPES } from "src/common/types";


@Injectable()
export class GatewayService {
  constructor(
    @Inject(TYPES.HttpTransactionSystemClient)
    private readonly httpTransactionSystemClient: HttpTransactionSystemClient
  ) {}

  async getTransaction(id: string) {
    const transaction = this.httpTransactionSystemClient.getTransaction(id);
    return transaction;
  }

  async createTransaction(data: any) {
    const transaction = await this.httpTransactionSystemClient.createTransaction(data);
    return transaction;
  }
}