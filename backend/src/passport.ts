// src/passport.ts
import passport from "passport";
import { localStrategy } from "./strategies/localStrategy";
import { jwtStrategy } from "./strategies/jwtStrategy";

passport.use(localStrategy);
passport.use("jwt", jwtStrategy);

export default passport;
