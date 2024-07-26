import { IsString, IsNumber } from 'class-validator';

export class TransactionResponseDto {
  @IsString()
  transactionExternalId: string;

  transactionType: {
    name: string;
  };

  transactionStatus: {
    name: string;
  };

  @IsNumber()
  value: number;

  @IsString()
  createdAt: string;
}
