import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { User } from "./User";
import { Application } from "./Application";

@Entity()
export class JobOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @ManyToOne(() => User, user => user.jobOffers)
  recruiter: User;

  @OneToMany(() => Application, app => app.jobOffer)
  applications: Application[];
}
