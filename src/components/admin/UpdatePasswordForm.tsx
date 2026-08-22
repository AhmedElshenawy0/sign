"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { setFlashToast } from "@/lib/admin-toast";
import { readApiError } from "@/lib/api";

export default function UpdatePasswordForm({ email }: { email?: string }) {
  const [saving, setSaving] = useState(false);

  async function onFinish(values: {
    email: string;
    password?: string;
    confirm?: string;
  }) {
    setSaving(true);
    try {
      const res = await fetch("/api/auth/account", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password || undefined,
        }),
      });
      if (!res.ok) throw new Error(await readApiError(res));
      const changedPassword = Boolean(values.password);
      const message = changedPassword
        ? "Email and password updated."
        : "Email updated.";
      setFlashToast("success", message);
      toast.success(message);
      window.location.href = "/admin/projects";
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update the account.",
      );
      setSaving(false);
    }
  }

  return (
    <motion.div
      className="w-full max-w-[440px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#0e985d] to-transparent" />
        <div className="px-8 py-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
            Settings
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Account</h1>
          <p className="mb-6 mt-2 text-sm text-slate-400">
            Update the login email. Leave password blank to keep the current one.
          </p>
          <Form
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            initialValues={{ email: email ?? "" }}
          >
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
              label="New password"
              rules={[{ min: 6, message: "At least 6 characters" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-slate-500" />}
                placeholder="Optional"
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm password"
              dependencies={["password"]}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const password = getFieldValue("password");
                    if (!password || password === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Repeat new password"
                autoComplete="new-password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={saving}>
              Save changes
            </Button>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
