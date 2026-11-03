import { Moon, Sun, CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("bv-theme") : null;
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("bv-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl sm:px-6">
      <SidebarTrigger />
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-semibold sm:text-base">Braille Vision AI</span>
        <Badge variant="secondary" className="hidden gap-1.5 sm:inline-flex">
          <CircleDot className="h-3 w-3 text-success" />
          <span className="text-xs">Model Online</span>
        </Badge>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
          <AvatarFallback className="gradient-primary text-xs font-semibold text-primary-foreground">
            AI
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
