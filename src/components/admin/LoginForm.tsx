"use client";

import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { readApiError } from "@/lib/api";
import GridBg from "@/components/global/GridBg";

type Props = {
  error?: string;
  message?: string;
  next?: string;
};

export default function LoginForm({ error, message, next }: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  async function onLogin(values: { email: string; password: string }) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        toast.error(await readApiError(res));
        setLoading(false);
        return;
      }

      window.location.href = next?.startsWith("/admin")
        ? next
        : "/admin/projects";
    } catch {
      toast.error("Could not log in. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-16">
      <GridBg variant="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#0e985d]/20 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[100px]"
      />

      <motion.div
        className="relative w-full max-w-[420px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#0e985d] to-transparent" />
          <div className="px-8 pb-8 pt-10">
            <div className="mb-8 text-center">
              <img
                src="/images/SignUp Logo White.png"
                alt="Sign Up"
                className="mx-auto mb-4 h-[72px] w-[72px] rounded-full border border-white/10 bg-slate-950 object-cover p-1.5"
              />
              <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#0e985d]">
                Studio admin
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Sign in to manage the project gallery.
              </p>
            </div>

            <Form layout="vertical" onFinish={onLogin} requiredMark={false}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined className="text-slate-500" />}
                  placeholder="Email address"
                  autoComplete="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="text-slate-500" />}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="mt-1 h-12 font-semibold"
              >
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
