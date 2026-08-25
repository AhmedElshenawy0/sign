"use client";

import { useEffect, useState } from "react";
import { Button, ConfigProvider, Form, Input, theme } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { readApiError } from "@/lib/api";
import { safeAdminNext } from "@/lib/admin-path";
import GridBg from "@/components/global/GridBg";

const fieldStyles = {
  root: {
    height: 48,
    borderRadius: 16,
    background: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.14)",
    overflow: "hidden" as const,
    alignItems: "center" as const,
  },
  input: {
    color: "#ffffff",
    background: "transparent",
    height: "100%",
    boxShadow: "none",
  },
  prefix: {
    color: "#94a3b8",
  },
} as const;

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400";

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
          email: values.email.trim().toLowerCase(),
          password: values.password,
        }),
      });

      if (!res.ok) {
        toast.error(await readApiError(res));
        setLoading(false);
        return;
      }

      window.location.assign(safeAdminNext(next));
    } catch {
      toast.error("Could not log in. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-16">
      <style>{`
        .login-studio-field input,
        input.login-studio-field {
          height: 46px !important;
          line-height: 46px !important;
          background: transparent !important;
          box-shadow: none !important;
          color: #fff !important;
        }
        .login-studio-field input:-webkit-autofill,
        .login-studio-field input:-webkit-autofill:hover,
        .login-studio-field input:-webkit-autofill:focus,
        input.login-studio-field:-webkit-autofill,
        input.login-studio-field:-webkit-autofill:hover,
        input.login-studio-field:-webkit-autofill:focus {
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          box-shadow: 0 0 0 1000px #111827 inset !important;
          transition: background-color 9999s ease-out;
        }
      `}</style>
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

            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  colorPrimary: "#0e985d",
                  borderRadius: 16,
                  controlHeightLG: 48,
                },
                components: {
                  Input: {
                    activeBorderColor: "#0e985d",
                    hoverBorderColor: "rgba(14,152,93,0.55)",
                    activeShadow: "0 0 0 3px rgba(14,152,93,0.2)",
                    colorBgContainer: "rgba(255,255,255,0.06)",
                    colorText: "#ffffff",
                    colorTextPlaceholder: "#64748b",
                    colorBorder: "rgba(255,255,255,0.14)",
                  },
                },
              }}
            >
            <Form layout="vertical" onFinish={onLogin} requiredMark={false}>
              <Form.Item
                name="email"
                label={<span className={labelClass}>Email</span>}
                normalize={(value) =>
                  typeof value === "string" ? value.trim() : value
                }
                rules={[
                  { required: true, whitespace: true, message: "Enter a valid email" },
                  {
                    pattern: /^[^\s@]+@[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input
                  size="large"
                  variant="outlined"
                  className="login-studio-field"
                  styles={fieldStyles}
                  prefix={<MailOutlined />}
                  placeholder="Email address"
                  autoComplete="email"
                  inputMode="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={<span className={labelClass}>Password</span>}
                rules={[{ required: true, message: "Enter your password" }]}
              >
                <Input.Password
                  size="large"
                  variant="outlined"
                  className="login-studio-field"
                  styles={fieldStyles}
                  prefix={<LockOutlined />}
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
                className="mt-2 h-12 rounded-2xl font-semibold shadow-[0_10px_28px_rgba(14,152,93,0.28)]"
              >
                Continue
              </Button>
            </Form>
            </ConfigProvider>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
