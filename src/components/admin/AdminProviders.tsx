"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme } from "antd";
import { Toaster } from "react-hot-toast";
import { consumeFlashToast, toast } from "@/lib/admin-toast";
import "./admin-shell.css";

const brandTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#0e985d",
    colorInfo: "#0e985d",
    colorSuccess: "#0e985d",
    colorError: "#e54411",
    colorWarning: "#c9a66b",
    colorBgBase: "#05070c",
    colorBgContainer: "#0c1220",
    colorBgElevated: "#111827",
    colorBorder: "rgba(255,255,255,0.08)",
    colorText: "#f8fafc",
    colorTextSecondary: "#94a3b8",
    borderRadius: 12,
    borderRadiusLG: 16,
    controlHeight: 40,
    controlHeightLG: 44,
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingInline: 16,
      fontWeight: 600,
    },
    Card: {
      colorBgContainer: "rgba(12,18,32,0.88)",
    },
    Form: {
      labelColor: "#94a3b8",
      labelFontSize: 12,
    },
    Input: {
      activeBorderColor: "#0e985d",
      hoverBorderColor: "rgba(14,152,93,0.5)",
      colorBgContainer: "#111827",
    },
    Select: {
      optionSelectedBg: "rgba(14,152,93,0.18)",
    },
    Segmented: {
      itemSelectedBg: "#0e985d",
      itemSelectedColor: "#ffffff",
      trackBg: "rgba(255,255,255,0.04)",
    },
    Upload: {
      colorBorder: "rgba(255,255,255,0.12)",
    },
    Modal: {
      contentBg: "#0c1220",
      headerBg: "#0c1220",
      footerBg: "#0c1220",
      titleColor: "#f8fafc",
    },
  },
};

export default function AdminProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const previousDir = html.getAttribute("dir");
    html.setAttribute("dir", "ltr");
    return () => {
      if (previousDir) html.setAttribute("dir", previousDir);
      else html.removeAttribute("dir");
    };
  }, []);

  useEffect(() => {
    const flash = consumeFlashToast();
    if (!flash) return;
    const timer = window.setTimeout(() => {
      toast[flash.type](flash.message);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AntdRegistry>
      <ConfigProvider theme={brandTheme} direction="ltr">
        <App className="admin-antd-app">{children}</App>
        <Toaster
            position="top-right"
            gutter={10}
            containerClassName="admin-toast-container"
            containerStyle={{ zIndex: 99999 }}
            toastOptions={{
              duration: 3600,
              className: "admin-toast",
              style: {
                background:
                  "linear-gradient(180deg, rgba(14, 22, 36, 0.98), rgba(8, 12, 20, 0.98))",
                color: "#f8fafc",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 16,
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                padding: "14px 16px",
              },
              success: {
                className: "admin-toast admin-toast--success",
                iconTheme: { primary: "#0e985d", secondary: "#0c1220" },
              },
              error: {
                className: "admin-toast admin-toast--error",
                iconTheme: { primary: "#e54411", secondary: "#0c1220" },
              },
            }}
          />
      </ConfigProvider>
    </AntdRegistry>
  );
}
