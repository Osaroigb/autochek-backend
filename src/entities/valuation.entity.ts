import { Vehicle } from "./vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  estimatedValue: number;

  @Column()
  date: Date;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.valuation)
  vehicle: Vehicle;
}
