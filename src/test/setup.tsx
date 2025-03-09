import QueryProvider from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastContext";

export const GeneralAppSetup = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
};
