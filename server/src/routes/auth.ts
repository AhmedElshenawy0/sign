import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { COOKIE_NAME, cookieOptions, signToken } from "../lib/auth.js";
import { requireAuth, type AuthedRequest } from "../middleware/requireAuth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const token = signToken({ sub: user.id, email: user.email });
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.json({ user: { id: user.id, email: user.email } });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
  res.json({ ok: true });
});

authRouter.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: { id: req.user?.id, email: req.user?.email } });
});

authRouter.post("/password", requireAuth, async (req: AuthedRequest, res) => {
  const password = String(req.body?.password ?? "");
  if (password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.update({
    where: { id: req.user!.id },
    data: { passwordHash },
  });
  res.json({ ok: true });
});

authRouter.post("/account", requireAuth, async (req: AuthedRequest, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const password = String(req.body?.password ?? "");

  if (!email || !email.includes("@")) {
    res.status(400).json({ error: "Enter a valid email." });
    return;
  }

  if (password && password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters." });
    return;
  }

  const data: { email: string; passwordHash?: string } = { email };
  if (password) {
    data.passwordHash = await bcrypt.hash(password, 12);
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data,
    });
    const token = signToken({ sub: user.id, email: user.email });
    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(400).json({ error: "That email is already in use." });
      return;
    }
    throw error;
  }
});
