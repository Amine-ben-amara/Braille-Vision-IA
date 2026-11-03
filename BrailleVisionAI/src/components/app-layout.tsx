import { type ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-siderbar";
import { TopNav } from "./top-nav";
import { Toaster } from "@/components/ui/sonner";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex min-w-0 flex-1 flex-col">
          <TopNav />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-border/60 px-6 py-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Braille Vision AI · Built during AI engineering internship
          </footer>
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  );
}
