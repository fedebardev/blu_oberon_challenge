import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types/authRequest";
export const requireRole = (role: "recruiter" | "candidate") => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized: no user found" });
      }

      if (req.user.role !== role) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      next();
    } catch (error) {
      console.error("Error in requireRole middleware:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
