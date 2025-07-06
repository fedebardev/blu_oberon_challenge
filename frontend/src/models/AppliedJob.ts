export interface AppliedJob {
  id: number;
  title: string;
  description: string;
  location: string;
  recruiter: {
    id: number;
    email: string;
    role: string;
  };
}
