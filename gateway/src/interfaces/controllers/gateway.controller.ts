import { Response } from "express";
import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { GatewayService } from "src/service/application/gateway.service";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { Logger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { TransactionResponseDto } from "../dto/response-transaction.dto";
import { tranferType } from "src/common/constant";

@Controller('transaction')
export class GatewayController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private gatewayService: GatewayService
  ) {
  }

  @Get(':id')
  async getTransactions(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    this.logger.info(`Getting transaction for user`, GatewayController);
    const transaction = await this.gatewayService.getTransaction(id);
    const response: TransactionResponseDto = {
      transactionExternalId: transaction.transactionExternalId,
      transactionType: {
        name: tranferType[transaction.tranferTypeId],
      },
      transactionStatus: {
        name: transaction.transactionStatus,
      },
      value: transaction.value,
      createdAt: transaction.createdAt,
    };
    res.status(HttpStatus.OK);
    res.send(response);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTransaction(
    @Body() data: CreateTransactionDto,
    @Res() res: Response,
  ) {
    this.logger.info(`Creating transaction for user`, GatewayController);
    const transaction = await this.gatewayService.createTransaction(data);
    res.status(HttpStatus.CREATED);
    res.send(transaction);
  }
}
