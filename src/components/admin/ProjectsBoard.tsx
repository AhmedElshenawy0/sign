"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Empty, Segmented } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import {
  PROJECT_TYPE_LABELS,
  PROJECT_TYPES,
  type Project,
  type ProjectType,
} from "@/types/project";

type Props = {
  items: Project[];
  selected?: ProjectType;
};

export default function ProjectsBoard({ items, selected }: Props) {
  const router = useRouter();
  const visible = selected
    ? items.filter((item) => item.type === selected)
    : items;

  const counts = {
    all: items.length,
    ...Object.fromEntries(
      PROJECT_TYPES.map((type) => [
        type,
        items.filter((item) => item.type === type).length,
      ]),
    ),
  } as Record<"all" | ProjectType, number>;

  return (
    <motion.main
      className="relative mx-auto max-w-6xl px-4 py-10 md:px-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <section className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
              Library
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Projects
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Upload and organize logos, designs, videos, and prints. Updates
              show on the public gallery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {(["all", ...PROJECT_TYPES] as const).map((key) => (
              <div
                key={key}
                className="min-w-[88px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {key === "all" ? "Total" : PROJECT_TYPE_LABELS[key]}
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {counts[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Segmented
          size="large"
          value={selected ?? "all"}
          options={[
            { label: "All", value: "all" },
            ...PROJECT_TYPES.map((value) => ({
              label: PROJECT_TYPE_LABELS[value],
              value,
            })),
          ]}
          onChange={(value) => {
            router.push(
              value === "all"
                ? "/admin/projects"
                : `/admin/projects?type=${value}`,
            );
          }}
        />
        <Link href="/admin/projects/new">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            Add project
          </Button>
        </Link>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 py-16">
          <Empty description="No projects in this category yet." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-lg shadow-black/20"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                {item.type === "videos" ? (
                  <video
                    src={item.media_url}
                    poster={item.poster_url ?? undefined}
                    className="h-full w-full object-cover"
                    muted
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[#0e985d] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {PROJECT_TYPE_LABELS[item.type]}
                </span>
              </div>
              <div className="space-y-4 p-4">
                <h2 className="truncate text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${item.id}`}
                    className="flex flex-1 items-center justify-center rounded-xl bg-[#0e985d] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#0b7a4a]"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton id={item.id} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </motion.main>
  );
}
