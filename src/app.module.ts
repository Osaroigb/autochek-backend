import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './typeorm.config';
import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ValuationsModule } from './valuations/valuations.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    VehiclesModule,
    ValuationsModule,
    LoansModule,
    UsersModule,
  ],
})

export class AppModule {}


// TODO: implement single responsibility in valuations.service adhering to SOLID principles
//? there should only be on repository injected in the constructor

// TODO: add error handling for vehicles that don't exist when creating a loan

// TODO: implement user access control (admin, user, guest)
//? admins can add/create vehicles
//? users can ONLY apply for loans
