import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { hashPassword } from "../utils/auth";

const userRepo = AppDataSource.getRepository(User);

export const signup = async (req: Request, res: Response,): Promise<any> => {
    try{
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existing = await userRepo.findOne({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email already in use" });
  }

  const user = userRepo.create({
    email,
    password: await hashPassword(password),
    role: role || "candidate",
  });

  await userRepo.save(user);

     return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
