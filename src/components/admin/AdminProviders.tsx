"use client";

import { useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { consumeFlashToast } from "@/lib/admin-toast";
import "react-toastify/dist/ReactToastify.css";

const brandTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#0e985d",
    colorInfo: "#0e985d",
    colorSuccess: "#0e985d",
    colorError: "#e54411",
    colorWarning: "#c9a66b",
    colorBgBase: "#020617",
    colorBgContainer: "#0f172a",
    colorBorder: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    fontFamily: "Montserrat, sans-serif",
  },
};

export default function AdminProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const flash = consumeFlashToast();
    if (!flash) return;
    toast[flash.type](flash.message);
  }, []);

  return (
    <AntdRegistry>
      <ConfigProvider theme={brandTheme}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3200}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </ConfigProvider>
    </AntdRegistry>
  );
}
