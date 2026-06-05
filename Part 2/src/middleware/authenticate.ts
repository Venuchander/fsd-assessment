import type { Request, Response, NextFunction } from "express";
import { Role, AuthUser } from "../types";

export type AuthRequest = Request & { user?: AuthUser };

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: no token provided" });
    return;
  }

  const token = authHeader.slice(7);

  if (!token) {
    res.status(401).json({ error: "Unauthorized: empty token" });
    return;
  }

  req.user = {
    id: "usr_simulated_001",
    role: Role.CONTRIBUTOR,
  };

  next();
}
