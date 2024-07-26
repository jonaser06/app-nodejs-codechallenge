import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsString()
    accountExternalIdCredit: string;

    @IsString()
    accountExternalIdDebit: string;

    @IsInt()
    tranferTypeId: number;

    @IsNumber()
    value: number;
}
