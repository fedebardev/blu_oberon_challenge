import type { Application } from "./Application";

export interface RecruiterJob {
  id: number;
  title: string;
  description: string;
  location: string;
  applications: Application[];
}