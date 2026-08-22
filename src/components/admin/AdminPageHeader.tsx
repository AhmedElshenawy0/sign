"use client";

import Link from "next/link";
import { Button, Typography } from "antd";
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
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <Link href={backHref}>
          <Button type="text" icon={<ArrowLeftOutlined />} style={{ color: "#94a3b8" }}>
            {backLabel}
          </Button>
        </Link>
        <Typography.Title level={2} style={{ color: "#fff", marginTop: 12, marginBottom: 4 }}>
          {title}
        </Typography.Title>
        {subtitle ? (
          <p className="max-w-lg text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {deleteId ? <DeleteProjectButton id={deleteId} /> : null}
    </motion.div>
  );
}
