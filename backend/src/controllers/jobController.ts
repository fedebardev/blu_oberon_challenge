import { Response } from "express";
import { AuthRequest } from "../../types/authRequest";

import { AppDataSource } from "../data-source";
import { JobOffer } from "../entities/JobOffer";
import { Application } from "../entities/Application";
import { User } from "../entities/User";

const jobRepo = AppDataSource.getRepository(JobOffer);
const appRepo = AppDataSource.getRepository(Application);

export const getAllJobOffers = async (_req: AuthRequest, res: Response) => {
  const jobs = await jobRepo.find({ relations: ["recruiter"] });
  res.json(jobs);
};

export const getMyJobOffers = async (req: AuthRequest, res: Response) => {
  const jobs = await jobRepo.find({
    where: { recruiter: { id: req.user?.id } },
    relations: ["applications","applications.candidate"],
  });
  res.json(jobs);
};

export const getMyApplications = async (req: AuthRequest, res: Response) => {
  const apps = await appRepo.find({
    where: { candidate: { id: req.user?.id } },
    relations: ["jobOffer","jobOffer.recruiter"],
  });
  res.json(apps.map(app => app.jobOffer));
};

export const createJobOffer = async (req: AuthRequest, res: Response) => {
  const { title, description, location } = req.body;
  const job = jobRepo.create({
    title,
    description,
    location,
    recruiter: req.user,
  });
  await jobRepo.save(job);
  res.status(201).json(job);
};

export const applyToJob = async (req: AuthRequest, res: Response):Promise<any> => {
  const job = await jobRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!job) return res.status(404).json({ error: "Job not found" });

  const existing = await appRepo.findOne({
    where: {
      candidate: { id: req.user.id },
      jobOffer: { id: job.id },
    },
  });
  if (existing) return res.status(409).json({ error: "Already applied" });

  const app = appRepo.create({
    candidate: req.user,
    jobOffer: job,
  });
  await appRepo.save(app);
  res.status(201).json({ message: "Application submitted" });
};
