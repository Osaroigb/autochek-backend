import { Module } from '@nestjs/common';

// import { AppService } from './app.service';
// import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

// import { User } from './entities/user.entity';
// import { Vehicle } from './entities/vehicle.entity';
// import { Valuation } from './entities/valuation.entity';
// import { LoanApplication } from './entities/loan-application.entity';

import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ValuationsModule } from './valuations/valuations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    VehiclesModule,
    ValuationsModule,
    LoansModule,
    UsersModule
  ]
  // controllers: [AppController],
  // providers: [AppService]
})

export class AppModule {}
