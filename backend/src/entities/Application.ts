import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column
} from "typeorm";
import { User } from "./User";
import { JobOffer } from "./JobOffer";

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.applications)
  candidate: User;

  @ManyToOne(() => JobOffer, offer => offer.applications)
  jobOffer: JobOffer;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  appliedAt: Date;
}
