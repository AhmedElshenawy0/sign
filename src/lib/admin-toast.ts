const FLASH_KEY = "admin-flash-toast";

export type FlashToast = {
  type: "success" | "error" | "info";
  message: string;
};

export function setFlashToast(type: FlashToast["type"], message: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(FLASH_KEY, JSON.stringify({ type, message }));
}

export function consumeFlashToast(): FlashToast | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(FLASH_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(FLASH_KEY);
  try {
    return JSON.parse(raw) as FlashToast;
  } catch {
    return null;
  }
}
