import { Inject, Injectable } from "@nestjs/common";
import { PrismaClient, Transaction } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { TransactionStatus } from "src/common/constants";
import { TransactionError } from "src/service/domain/error/repositories/transaction.error";
import { TransactionRepository } from "src/service/domain/repositories/transaction.repository";
import { Logger } from "winston";

@Injectable()
export class PsTransactionRepository implements TransactionRepository {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) { }

  async create(transaction: any): Promise<any> {
    try {
      return await this.prisma.transaction.create({ data: transaction });
    } catch (error) {
      this.logger.error(`An error occurred while creating the transaction`, error.stack);
      throw new TransactionError(`An error occurred while creating the transaction`)
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      return await this.prisma.transaction.findUnique({ where: { transactionExternalId: id } });
    } catch (error) {
      this.logger.error(`An error occurred while finding the transaction`, error.stack);
      throw new TransactionError(`An error occurred while finding the transaction`)
    }
  }

  async updateOne(transactionExternalId: string, transactionStatus: TransactionStatus): Promise<any> {
    try {
      return await this.prisma.transaction.update({ where: { transactionExternalId }, data: { transactionStatus } });
    } catch (error) {
      this.logger.error(`An error occurred while updating the transaction`, error.stack);
      throw new TransactionError(`An error occurred while updating the transaction`)
    }
  }
}