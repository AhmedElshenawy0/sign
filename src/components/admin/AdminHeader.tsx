"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "antd";
import {
  AppstoreOutlined,
  ExportOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function AdminHeader({ email }: { email?: string }) {
  const pathname = usePathname();
  const onProjects = pathname.startsWith("/admin/projects");
  const onIntro = pathname.startsWith("/admin/intro");
  const onAccount = pathname.startsWith("/admin/update-password");

  async function onLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/admin/login";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link href="/admin/projects" className="flex items-center gap-3">
          <Avatar src="/images/SignUp Logo White.png" size={40} />
          <div className="leading-tight">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
              Sign Up
            </p>
            <p className="text-sm font-semibold text-white">Project studio</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2">
          <Link href="/admin/projects">
            <Button type={onProjects ? "primary" : "default"} icon={<AppstoreOutlined />}>
              Projects
            </Button>
          </Link>
          <Link href="/admin/intro">
            <Button type={onIntro ? "primary" : "default"} icon={<PlayCircleOutlined />}>
              Intro
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button icon={<ExportOutlined />}>View intro</Button>
          </Link>
          <Link href="/admin/update-password">
            <Button type={onAccount ? "primary" : "default"} icon={<UserOutlined />}>
              Account
            </Button>
          </Link>
          <Link href="/projects" target="_blank">
            <Button icon={<ExportOutlined />}>View gallery</Button>
          </Link>
          {email ? (
            <span className="hidden max-w-[200px] truncate rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 md:inline">
              {email}
            </span>
          ) : null}
          <Button danger icon={<LogoutOutlined />} onClick={onLogout}>
            Log out
          </Button>
        </nav>
      </div>
    </header>
  );
}
