import { Router } from "express";
import passport from "passport";
import {
  getAllJobOffers,
  getMyJobOffers,
  getMyApplications,
  createJobOffer,
  applyToJob,
} from "../controllers/jobController";
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();
const auth = passport.authenticate("jwt", { session: false });

router.get("/", getAllJobOffers);
router.get("/recruiter/offers", auth, requireRole("recruiter"), getMyJobOffers);
router.get("/applied", auth, requireRole("candidate"), getMyApplications);
router.post("/", auth, requireRole("recruiter"), createJobOffer);
router.post("/:id/apply", auth, requireRole("candidate"), applyToJob);

export default router;
