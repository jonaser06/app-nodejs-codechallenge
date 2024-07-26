import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { envs } from "src/common";
import { TransactionService } from "src/service/application/transaction.service";

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Get(":id")
  async getTransactions(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const transaction = await this.transactionService.getTransaction(id);
    res.status(HttpStatus.OK);
    res.send(transaction);
  }

  @Post()
  async createTransaction(
    @Body() body: any,
    @Res() res: Response
  ) {
    const transaction= await this.transactionService.createTransaction(body);
    const { transactionExternalId, value } = transaction
    await this.transactionService.sendMessage(envs.topicAntifraud, { transactionExternalId, value });
    res.status(HttpStatus.OK);
    res.send(transaction);
  }
}