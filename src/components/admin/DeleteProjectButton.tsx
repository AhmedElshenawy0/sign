"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteProjectAction } from "@/app/admin/projects/actions";
import { setFlashToast } from "@/lib/admin-toast";

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  function onDelete() {
    Modal.confirm({
      title: "Delete this project?",
      content: "This cannot be undone. The file will be removed too.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      async onOk() {
        setBusy(true);
        try {
          await deleteProjectAction(id);
          setFlashToast("success", "Project deleted.");
          toast.success("Project deleted.");
          router.push("/admin/projects");
          router.refresh();
        } catch (err) {
          if (err && typeof err === "object" && "digest" in err) throw err;
          setBusy(false);
          toast.error("Could not delete this project.");
          return Promise.reject(err);
        }
      },
    });
  }

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={onDelete}
      loading={busy}
      className="h-[42px] rounded-xl border-[#e54411]/35 !bg-[#e54411]/12 font-semibold !text-[#ff8a70] shadow-[0_8px_18px_rgba(229,68,17,0.12)] transition hover:-translate-y-0.5 hover:!border-[#e54411] hover:!bg-[#e54411] hover:!text-white hover:shadow-[0_12px_24px_rgba(229,68,17,0.28)]"
    >
      Delete
    </Button>
  );
}
