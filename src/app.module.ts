import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './typeorm.config';
import { AppController } from './app.controller';

import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Valuation } from './entities/valuation.entity';
import { LoanApplication } from './entities/loan-application.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Vehicle, Valuation, LoanApplication],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Vehicle, Valuation, LoanApplication])
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
