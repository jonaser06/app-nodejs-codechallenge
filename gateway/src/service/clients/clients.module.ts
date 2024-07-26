import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TYPES } from "src/common/types";

import { HttpTransactionSystemClient } from "./transaction-system/http-transaction-system.client";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
        rejectUnauthorized: false
      })
    })
  ],
  providers: [
    {
      provide: TYPES.HttpTransactionSystemClient,
      useClass: HttpTransactionSystemClient
    }
  ],
  exports: [
    {
      provide: TYPES.HttpTransactionSystemClient,
      useClass: HttpTransactionSystemClient
    }
  ]
})

export class ClientsModule {}