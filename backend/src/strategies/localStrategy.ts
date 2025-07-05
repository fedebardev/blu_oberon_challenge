// src/strategies/localStrategy.ts
import { Strategy } from "passport-local";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export const localStrategy = new Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) return done(null, false, { message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return done(null, false, { message: "Invalid password" });

    return done(null, user);
  }
);
