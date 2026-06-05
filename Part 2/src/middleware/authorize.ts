import type { Response, NextFunction } from "express";
import type { Role } from "../types";
import type { AuthRequest } from "./authenticate";

export function authorize(allowedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized: authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Forbidden: requires one of [${allowedRoles.join(", ")}]`,
      });
      return;
    }

    next();
  };
}
