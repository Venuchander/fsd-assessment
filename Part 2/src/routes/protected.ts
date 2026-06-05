import { Router, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { Role } from "../types";

const router = Router();

router.get("/profile", authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

router.post(
  "/content",
  authenticate,
  authorize([Role.ADMIN, Role.EDITOR]),
  (_req, res) => {
    res.status(201).json({ message: "Content created successfully" });
  },
);

router.delete("/system", authenticate, authorize([Role.ADMIN]), (_req, res) => {
  res.json({ message: "System resource deleted successfully" });
});

export default router;
