import type { Request, Response, NextFunction } from "express";
import { COOKIE_NAME, verifyToken } from "../lib/auth.js";

export type AuthedRequest = Request & {
  user?: { id: string; email: string };
};

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME] as string | undefined;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
