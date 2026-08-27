"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "antd";
import {
  AppstoreOutlined,
  ExportOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const studioLinks = [
  { href: "/admin/projects", label: "Projects", icon: AppstoreOutlined, match: "projects" },
  { href: "/admin/intro", label: "Intro", icon: PlayCircleOutlined, match: "intro" },
  { href: "/admin/showreel", label: "Showreel", icon: VideoCameraOutlined, match: "showreel" },
] as const;

const previewLinks = [
  { href: "/", label: "View site", icon: ExportOutlined },
  { href: "/projects", label: "View gallery", icon: ExportOutlined },
] as const;

export default function AdminHeader({ email }: { email?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onAccount = pathname.startsWith("/admin/update-password");

  async function onLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/admin/login";
  }

  const nav = (
    <>
      <Link
        href="/admin/projects"
        onClick={() => setOpen(false)}
        className="mb-8 flex items-center gap-3 px-1"
      >
        <Avatar src="/images/SignUp Logo White.png" size={40} />
        <div className="leading-tight">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
            Sign Up
          </p>
          <p className="text-sm font-semibold text-white">Project studio</p>
        </div>
      </Link>

      <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-500">
        Studio
      </p>
      <nav className="flex flex-col gap-1">
        {studioLinks.map(({ href, label, icon: Icon, match }) => {
          const active = pathname.startsWith(`/admin/${match}`);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#0e985d] text-white shadow-[0_0_24px_rgba(14,152,93,0.25)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mb-2 mt-8 px-3 text-[10px] font-extrabold uppercase tracking-[0.28em] text-slate-500">
        Preview
      </p>
      <nav className="flex flex-col gap-1">
        {previewLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Link
          href="/admin/update-password"
          onClick={() => setOpen(false)}
          className={`mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
            onAccount
              ? "bg-[#0e985d] text-white shadow-[0_0_24px_rgba(14,152,93,0.25)]"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <UserOutlined />
          Account
        </Link>
        {email ? (
          <p className="mb-3 truncate px-3 text-xs text-slate-500">{email}</p>
        ) : null}
        <Button danger icon={<LogoutOutlined />} block onClick={onLogout}>
          Log out
        </Button>
      </div>
    </>
  );

  return (
    <div className="z-40 shrink-0 lg:sticky lg:top-0 lg:h-screen lg:w-[240px]">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/admin/projects" className="flex items-center gap-2">
          <Avatar src="/images/SignUp Logo White.png" size={32} />
          <span className="text-sm font-semibold text-white">Studio</span>
        </Link>
        <Button
          type="text"
          icon={open ? <CloseOutlined /> : <MenuOutlined />}
          onClick={() => setOpen((value) => !value)}
          style={{ color: "#fff" }}
        />
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-white/10 bg-slate-950/95 p-5 shadow-[20px_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 lg:static lg:h-full lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {nav}
      </aside>
    </div>
  );
}
