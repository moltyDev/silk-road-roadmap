import { AlertTriangle } from "lucide-react";

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`mt-12 p-4 border border-destructive/50 bg-destructive/10 rounded-lg flex items-start gap-4 ${className}`}>
      <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
      <div className="text-sm text-red-200/80 font-mono">
        <strong>EDUCATIONAL PURPOSE ONLY.</strong> No illegal goods or services. 
        This is a hypothetical conceptual roadmap and design study. 
        Comply with all local and international laws. 
        Not a real marketplace.
      </div>
    </div>
  );
}
