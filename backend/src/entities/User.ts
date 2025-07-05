import { Entity, PrimaryGeneratedColumn, Column,OneToMany, } from "typeorm"
import { JobOffer } from "./JobOffer";
import { Application } from "./Application";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "candidate" })
  role: "candidate" | "recruiter";
    @OneToMany(() => JobOffer, offer => offer.recruiter)
  jobOffers: JobOffer[];

  @OneToMany(() => Application, app => app.candidate)
  applications: Application[];
}


