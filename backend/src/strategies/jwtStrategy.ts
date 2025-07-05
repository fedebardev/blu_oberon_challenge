// src/strategies/jwtStrategy.ts
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import dotenv from "dotenv"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: payload.id } });

    if (!user) return done(null, false);
    return done(null, user);
  }
);
