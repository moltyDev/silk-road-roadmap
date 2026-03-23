import { Cable } from "lucide-react";

interface SidebarProps {
  sections: { id: string; label: string }[];
  activeId: string;
}

export function Sidebar({ sections, activeId }: SidebarProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-background/95 border-r border-primary/30 z-40 hidden lg:flex flex-col backdrop-blur-md">
      <div className="p-6 border-b border-primary/30 flex items-center gap-3">
        <Cable className="w-8 h-8 text-accent" />
        <h1 className="text-xl font-bold text-accent text-glow m-0">SR 2.0</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className={`
              text-left px-4 py-3 rounded-md font-mono text-sm transition-all duration-300
              ${activeId === sec.id 
                ? "bg-primary/20 text-accent border border-accent/50 box-glow-accent" 
                : "text-muted-foreground hover:text-accent hover:bg-primary/10 border border-transparent"}
            `}
          >
            {activeId === sec.id && <span className="mr-2 animate-blink">&gt;</span>}
            {sec.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-primary/30 text-xs text-muted-foreground font-mono">
        v1.0.0
      </div>
    </nav>
  );
}
