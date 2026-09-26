"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteProjectAction } from "@/app/admin/projects/actions";
import { setFlashToast, toast } from "@/lib/admin-toast";

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onConfirm() {
    setBusy(true);
    try {
      await deleteProjectAction(id);
      setFlashToast("success", "Project deleted.");
      toast.success("Project deleted.");
      setOpen(false);
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      if (err && typeof err === "object" && "digest" in err) throw err;
      setBusy(false);
      toast.error("Could not delete this project.");
    }
  }

  return (
    <>
      <Button
        danger
        icon={<DeleteOutlined />}
        onClick={() => setOpen(true)}
        loading={busy}
        className="h-10 rounded-xl border-[#e54411]/35 !bg-[#e54411]/12 font-semibold !text-[#ff8a70] shadow-[0_8px_18px_rgba(229,68,17,0.12)] transition hover:!border-[#e54411] hover:!bg-[#e54411] hover:!text-white"
      >
        Delete
      </Button>
      <Modal
        open={open}
        title="Delete this project?"
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        centered
        confirmLoading={busy}
        destroyOnHidden
        mask={{ closable: !busy }}
        onOk={onConfirm}
        onCancel={() => {
          if (!busy) setOpen(false);
        }}
        classNames={{ root: "admin-confirm-modal" }}
        wrapProps={{ dir: "ltr" }}
        getContainer={() =>
          document.querySelector<HTMLElement>(".admin-antd-app") ?? document.body
        }
        cancelButtonProps={{ autoFocus: true }}
        okButtonProps={{ danger: true }}
      >
        This cannot be undone. The file will be removed too.
      </Modal>
    </>
  );
}
