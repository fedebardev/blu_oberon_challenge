import type { Candidate } from "./Candidate";

export interface Application {
  id: number;
  candidate: Candidate;
  coverLetter: string;
}