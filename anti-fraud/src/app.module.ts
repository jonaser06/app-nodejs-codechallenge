import { Module } from '@nestjs/common';
import { ClientsModule } from './service/clients/clients.module';
import { InterfaceModule } from './interface/interface.module';
import { ApplicationModule } from './service/application/application.module';
import { logger as instance } from './common/logger';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({ useFactory: () => instance }),
    InterfaceModule,
    ApplicationModule,
    ClientsModule
  ],
})
export class AppModule {}
