import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signup } from "../controllers/authController";
dotenv.config()
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";


router.post("/signup", signup);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) return res.status(401).json({ error: info?.message || "Unauthorized" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  })(req, res, next);
});

router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});

export default router;
