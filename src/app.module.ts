import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AppService } from './app.service';
// import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ValuationsModule } from './valuations/valuations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    VehiclesModule,
    ValuationsModule,
    LoansModule,
    UsersModule,
  ],
  // controllers: [AppController],
  // providers: [AppService]
})
export class AppModule {}
