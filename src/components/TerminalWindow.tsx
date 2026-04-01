import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "bash", children, className = "" }: TerminalWindowProps) {
  return (
    <div className={className} style={{
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid #00ff4144',
      background: '#000',
      boxShadow: '0 0 20px rgba(0,255,65,0.15)',
    }}>
      <div style={{
        background: 'rgba(0,255,65,0.07)',
        padding: '8px 14px',
        borderBottom: '1px solid #00ff4133',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00ff41' }} />
        </div>
        <span style={{ marginLeft: 12, fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: '#00ff4177' }}>{title}</span>
      </div>
      <div className="scanlines" style={{
        padding: '16px 20px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '13px',
        color: '#00ff41',
        overflowX: 'auto',
        lineHeight: '1.7',
      }}>
        {children}
      </div>
    </div>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return <></>;
}
