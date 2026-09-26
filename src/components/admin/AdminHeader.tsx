"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  ExportOutlined,
  LogoutOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  VideoCameraOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { ADMIN_COPY } from "@/lib/admin-copy";

const overviewLinks = [
  { href: "/admin", label: ADMIN_COPY.nav.stats, icon: DashboardOutlined, id: "stats" },
] as const;

const libraryLinks = [
  { href: "/admin/projects", label: ADMIN_COPY.nav.projects, icon: AppstoreOutlined, id: "projects" },
  { href: "/admin/projects/new", label: ADMIN_COPY.nav.addProject, icon: PlusOutlined, id: "new" },
] as const;

const homepageLinks = [
  { href: "/admin/intro", label: ADMIN_COPY.nav.intro, icon: PlayCircleOutlined, id: "intro" },
  { href: "/admin/showreel", label: ADMIN_COPY.nav.showreel, icon: VideoCameraOutlined, id: "showreel" },
] as const;

const previewLinks = [
  { href: "/", label: ADMIN_COPY.nav.site, icon: ExportOutlined },
  { href: "/projects", label: ADMIN_COPY.nav.gallery, icon: ExportOutlined },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/projects/new") return pathname === "/admin/projects/new";
  if (href === "/admin/projects") {
    return pathname === "/admin/projects" || /^\/admin\/projects\/(?!new$)[a-zA-Z0-9-]+$/.test(pathname);
  }
  return pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
  accent,
  target,
}: {
  href: string;
  label: string;
  icon: typeof AppstoreOutlined;
  active: boolean;
  onClick?: () => void;
  accent?: boolean;
  target?: string;
}) {
  const className = `admin-nav-link flex h-12 items-center gap-3 rounded-[12px] px-3.5 text-[14px] font-semibold leading-none tracking-[-0.01em] transition-colors ${
    active
      ? "admin-nav-link--active bg-[#0e985d] text-white"
      : accent
        ? "admin-nav-link--accent border border-[#0e985d]/45 bg-[#0e985d]/10 hover:border-[#0e985d]/70 hover:bg-[#0e985d]/16"
        : "hover:bg-white/[0.06]"
  }`;

  if (target) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel="noopener noreferrer"
        className={className}
      >
        <Icon style={{ fontSize: 16, color: "inherit" }} />
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      <Icon style={{ fontSize: 16, color: "inherit" }} />
      {label}
    </Link>
  );
}

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 px-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <nav className="flex flex-col gap-1.5">{children}</nav>
    </div>
  );
}

export default function AdminHeader({ email }: { email?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onAccount = pathname.startsWith("/admin/update-password");
  const close = () => setOpen(false);

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
        href="/admin"
        onClick={close}
        className="mb-5 flex shrink-0 items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.03] px-3 py-2.5"
      >
        <Avatar src="/images/SignUp Logo White.png" size={40} />
        <div className="min-w-0 leading-none">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0e985d]">
            {ADMIN_COPY.brand.kicker}
          </p>
          <p className="mt-1.5 truncate text-[15px] font-semibold tracking-tight text-white">
            {ADMIN_COPY.brand.studio}
          </p>
        </div>
      </Link>

      <div className="admin-sidebar-scroll min-h-0 flex-1 space-y-5 overflow-y-auto pr-0">
        <NavGroup label={ADMIN_COPY.dashboard.statsKicker}>
          {overviewLinks.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
              onClick={close}
            />
          ))}
        </NavGroup>

        <NavGroup label={ADMIN_COPY.nav.studio}>
          {libraryLinks.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
              onClick={close}
              accent={item.id === "new"}
            />
          ))}
        </NavGroup>

        <NavGroup label={ADMIN_COPY.nav.homepage}>
          {homepageLinks.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
              onClick={close}
            />
          ))}
        </NavGroup>

        <NavGroup label={ADMIN_COPY.nav.preview}>
          {previewLinks.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={false}
              onClick={close}
              target="_blank"
            />
          ))}
        </NavGroup>
      </div>

      <div className="mt-4 shrink-0 border-t border-white/10 pt-4">
        <Link
          href="/admin/update-password"
          onClick={close}
          className={`admin-nav-link mb-2 flex h-12 items-center gap-3 rounded-[12px] px-3.5 text-[14px] font-semibold leading-none transition-colors ${
            onAccount
              ? "admin-nav-link--active bg-[#0e985d] text-white"
              : "hover:bg-white/[0.06]"
          }`}
        >
          <UserOutlined style={{ fontSize: 16, color: "inherit" }} />
          {ADMIN_COPY.nav.account}
        </Link>
        {email ? (
          <p className="mb-3 truncate px-3.5 text-[12px] leading-5 text-slate-500">
            {email}
          </p>
        ) : null}
        <Button
          danger
          icon={<LogoutOutlined />}
          block
          onClick={onLogout}
          style={{ height: 44, borderRadius: 12, fontWeight: 600 }}
        >
          {ADMIN_COPY.nav.logout}
        </Button>
      </div>
    </>
  );

  return (
    <div className="z-40 shrink-0 lg:sticky lg:top-0 lg:h-dvh lg:w-[288px]">
      <div className="flex h-14 items-center justify-between border-b border-white/10 bg-[#05070c]/90 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Avatar src="/images/SignUp Logo White.png" size={32} />
          <span className="text-sm font-semibold text-white">{ADMIN_COPY.brand.mobile}</span>
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
          onClick={close}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[288px] flex-col overflow-hidden border-r border-white/10 bg-[#070b14]/95 p-5 shadow-[20px_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 lg:static lg:h-full lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {nav}
      </aside>
    </div>
  );
}
