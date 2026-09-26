"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { setFlashToast, toast } from "@/lib/admin-toast";
import { ADMIN_COPY } from "@/lib/admin-copy";
import AdminFormCard from "@/components/admin/AdminFormCard";
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
    <AdminFormCard
      className="w-full max-w-[440px]"
      kicker={ADMIN_COPY.account.kicker}
      title={ADMIN_COPY.account.title}
      hint={ADMIN_COPY.account.subtitle}
    >
          <Form
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            initialValues={{ email: email ?? "" }}
          >
            <Form.Item
              name="email"
              label={ADMIN_COPY.account.email}
              rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="text-slate-500" />}
                placeholder={ADMIN_COPY.account.emailPlaceholder}
                autoComplete="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={ADMIN_COPY.account.password}
              rules={[{ min: 6, message: "At least 6 characters" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-slate-500" />}
                placeholder={ADMIN_COPY.account.passwordPlaceholder}
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label={ADMIN_COPY.account.confirm}
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
                placeholder={ADMIN_COPY.account.confirmPlaceholder}
                autoComplete="new-password"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={saving} className="h-11">
              {ADMIN_COPY.account.save}
            </Button>
          </Form>
    </AdminFormCard>
  );
}
