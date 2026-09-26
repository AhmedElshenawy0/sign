"use client";

import Link from "next/link";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

type Props = {
  title: string;
  subtitle?: string;
  deleteId?: string;
  backHref?: string;
  backLabel?: string;
};

export default function AdminPageHeader({
  title,
  subtitle,
  deleteId,
  backHref = "/admin/projects",
  backLabel = "Back to projects",
}: Props) {
  return (
    <motion.div
      className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="min-w-0">
        <Link href={backHref}>
          <Button type="text" icon={<ArrowLeftOutlined />} style={{ color: "#94a3b8", paddingInline: 0 }}>
            {backLabel}
          </Button>
        </Link>
        <h1 className="mt-2 break-words text-[24px] font-semibold leading-tight tracking-tight text-white sm:text-[28px] md:text-[32px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {deleteId ? (
        <div className="shrink-0 self-start sm:self-end">
          <DeleteProjectButton id={deleteId} />
        </div>
      ) : null}
    </motion.div>
  );
}
