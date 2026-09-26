"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Empty, Segmented } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { ADMIN_COPY } from "@/lib/admin-copy";
import {
  PROJECT_TYPE_LABELS,
  SERVICE_GROUPS,
  SERVICE_GROUP_LABELS,
  groupIdForType,
  isVideoProjectType,
  type Project,
  type ServiceGroupId,
} from "@/types/project";

type Props = {
  items: Project[];
  selected?: ServiceGroupId;
};

export default function ProjectsBoard({ items, selected }: Props) {
  const router = useRouter();
  const copy = ADMIN_COPY.dashboard;
  const visible = selected
    ? items.filter((item) => groupIdForType(item.type) === selected)
    : items;

  return (
    <motion.main
      className="relative mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-5 md:px-8 md:py-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0e985d] to-transparent" />
        <div className="p-5 sm:p-6 md:p-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
            {copy.libraryKicker}
          </p>
          <h1 className="mt-2 max-w-xl text-[28px] font-semibold leading-[1.1] tracking-tight text-white sm:text-[32px] md:text-[40px]">
            {copy.libraryTitle}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0c1220]/70 p-3 md:flex-row md:items-center md:justify-between">
        <div className="admin-filter-scroll min-w-0 flex-1">
          <Segmented
            size="large"
            value={selected ?? "all"}
            options={[
              { label: copy.filterAll, value: "all" },
              ...SERVICE_GROUPS.map((group) => ({
                label:
                  group.id === "photoVideo"
                    ? "Photo & Video"
                    : group.id === "nfc"
                      ? "NFC"
                      : SERVICE_GROUP_LABELS[group.id],
                value: group.id,
              })),
            ]}
            onChange={(value) => {
              router.push(
                value === "all"
                  ? "/admin/projects"
                  : `/admin/projects?group=${value}`,
              );
            }}
          />
        </div>
        <Link href="/admin/projects/new" className="w-full shrink-0 md:w-auto">
          <Button type="primary" size="large" icon={<PlusOutlined />} block>
            {copy.addProject}
          </Button>
        </Link>
      </div>

      {visible.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-white/10 bg-[#0c1220]/60 py-16"
        >
          <Empty description={copy.empty} />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80 shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                {isVideoProjectType(item.type) ? (
                  <video
                    src={item.media_url}
                    poster={item.poster_url ?? undefined}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    muted
                  />
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[#0e985d] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {PROJECT_TYPE_LABELS[item.type]}
                </span>
              </div>
              <div className="space-y-4 p-4">
                <h2 className="truncate text-[15px] font-semibold tracking-tight text-white">
                  {item.title}
                </h2>
                <div className="flex min-w-0 flex-wrap gap-2">
                  <Link
                    href={`/admin/projects/${item.id}`}
                    className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0e985d] px-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(14,152,93,0.22)] transition hover:bg-[#12b06c]"
                  >
                    {copy.edit}
                  </Link>
                  <div className="shrink-0">
                    <DeleteProjectButton id={item.id} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </motion.main>
  );
}
