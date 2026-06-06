import type { Request, Response, NextFunction } from "express";
import { Role, AuthUser } from "../types";

export type AuthRequest = Request & { user?: AuthUser };

const TOKEN_MAP: Record<string, AuthUser> = {
  "admin-token": { id: "usr_001", role: Role.ADMIN },
  "editor-token": { id: "usr_002", role: Role.EDITOR },
  "contributor-token": { id: "usr_003", role: Role.CONTRIBUTOR },
};

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

  const user = TOKEN_MAP[token];

  if (!user) {
    res.status(401).json({ error: "Unauthorized: invalid token" });
    return;
  }

  req.user = user;
  next();
}
