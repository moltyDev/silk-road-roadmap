import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "bash", children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg overflow-hidden border border-primary box-glow bg-black/80 ${className}`}>
      <div className="bg-primary/20 px-4 py-2 border-b border-primary flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-accent/80"></div>
        </div>
        <div className="ml-4 font-mono text-xs text-accent/70">{title}</div>
      </div>
      <div className="p-4 md:p-6 font-mono text-sm md:text-base text-gray-300 overflow-x-auto scanlines">
        {children}
      </div>
    </div>
  );
}
