import { useState, useRef } from "react";

const G = "#00ff41";
const GDIM = "#00ff4177";

const ONION_HOST = "3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid";

const PROXIES = [
  { label: "onion.ws",   url: `https://${ONION_HOST}.onion.ws/` },
  { label: "onion.ly",   url: `https://${ONION_HOST}.onion.ly/` },
  { label: "onion.pet",  url: `https://${ONION_HOST}.onion.pet/` },
  { label: "tor2web.fi", url: `https://${ONION_HOST}.tor2web.fi/` },
];

export default function Browse() {
  const [activeProxy, setActiveProxy] = useState(0);
  const [launched, setLaunched]       = useState(false);
  const [iframeErr, setIframeErr]     = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentProxy = PROXIES[activeProxy];

  const tryNext = () => {
    const next = (activeProxy + 1) % PROXIES.length;
    setActiveProxy(next);
    setIframeErr(false);
  };

  const openDirect = () => window.open(currentProxy.url, "_blank");

  return (
    <div style={{
      background: "#000", height: "100vh", display: "flex",
      flexDirection: "column", fontFamily: "'Share Tech Mono', monospace",
    }}>
      {/* BROWSER CHROME */}
      <div style={{
        background: "#050f05", borderBottom: `1px solid #00ff4133`,
        padding: "10px 16px", display: "flex", alignItems: "center",
        gap: 12, flexShrink: 0, flexWrap: "wrap",
      }}>
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <a href="/" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", display: "block" }} title="Back to Roadmap" />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: G }} />
        </div>

        {/* Address bar */}
        <div style={{
          flex: 1, minWidth: 200, background: "#000", border: `1px solid #00ff4144`,
          borderRadius: 4, padding: "6px 12px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 13 }}>🧅</span>
          <span style={{ color: G, fontSize: 12, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {launched ? currentProxy.url : "Click CONNECT to load Silk Road 2.0"}
          </span>
        </div>

        {/* Proxy selector */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PROXIES.map((p, i) => (
            <button
              key={p.label}
              onClick={() => { setActiveProxy(i); setIframeErr(false); setLaunched(true); }}
              style={{
                padding: "4px 10px",
                background: i === activeProxy ? `#00ff4122` : "transparent",
                border: `1px solid ${i === activeProxy ? G : "#00ff4133"}`,
                color: i === activeProxy ? G : GDIM,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 11, cursor: "pointer", borderRadius: 3,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={openDirect}
          style={{
            padding: "6px 14px", background: "transparent",
            border: `1px solid #00ff4144`, color: GDIM,
            fontFamily: "'Share Tech Mono', monospace", fontSize: 11,
            cursor: "pointer", borderRadius: 3, whiteSpace: "nowrap",
          }}
        >
          ↗ NEW TAB
        </button>
      </div>

      {/* IFRAME AREA */}
      <div style={{ flex: 1, position: "relative", background: "#000" }}>
        {!launched ? (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: 24,
            backgroundImage: `radial-gradient(ellipse at center, #00ff410d 0%, transparent 70%)`,
          }}>
            <img
              src="/cthulhu-favicon.jpg"
              alt="Cthulhu"
              style={{
                width: 90, height: 90, borderRadius: "50%",
                border: `2px solid #00ff4166`,
                boxShadow: `0 0 30px #00ff4144, 0 0 60px #00ff4122`,
                objectFit: "cover", marginBottom: 20,
              }}
            />
            <div style={{ color: G, fontSize: 22, textShadow: `0 0 12px ${G}`, marginBottom: 6 }}>
              SILK ROAD 2.0
            </div>
            <div style={{ color: GDIM, fontSize: 12, marginBottom: 32, letterSpacing: "0.1em" }}>
              Live marketplace — running via Tor2Web proxy
            </div>
            <button
              onClick={() => { setLaunched(true); setIframeErr(false); }}
              style={{
                padding: "14px 48px", background: G, border: `1px solid ${G}`,
                color: "#000", fontFamily: "'Share Tech Mono', monospace",
                fontSize: 15, cursor: "pointer", letterSpacing: "0.12em",
                boxShadow: `0 0 30px #00ff4166, 0 0 60px #00ff4133`,
                borderRadius: 3,
              }}
            >
              ▶ CONNECT
            </button>
            <div style={{ marginTop: 20, color: GDIM, fontSize: 11 }}>
              If one proxy fails, use the mirror buttons above
            </div>
          </div>
        ) : iframeErr ? (
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: 24,
          }}>
            <div style={{ color: "#ff6666", fontSize: 16, marginBottom: 8 }}>
              PROXY BLOCKED EMBEDDING
            </div>
            <div style={{ color: GDIM, fontSize: 12, marginBottom: 24 }}>
              <b style={{ color: G }}>{currentProxy.label}</b> doesn't allow iframe embedding.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={tryNext}
                style={{
                  padding: "10px 24px", background: "transparent", border: `1px solid ${G}`,
                  color: G, fontFamily: "'Share Tech Mono', monospace", fontSize: 13,
                  cursor: "pointer", borderRadius: 3,
                }}
              >
                TRY NEXT PROXY →
              </button>
              <button
                onClick={openDirect}
                style={{
                  padding: "10px 24px", background: G, border: `1px solid ${G}`,
                  color: "#000", fontFamily: "'Share Tech Mono', monospace", fontSize: 13,
                  cursor: "pointer", borderRadius: 3,
                }}
              >
                OPEN IN NEW TAB ↗
              </button>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={currentProxy.url}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Silk Road 2.0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            onError={() => setIframeErr(true)}
            onLoad={(e) => {
              try {
                const doc = (e.target as HTMLIFrameElement).contentDocument;
                if (doc && doc.title && doc.title.toLowerCase().includes("error")) {
                  setIframeErr(true);
                }
              } catch { /* cross-origin is fine — means it loaded */ }
            }}
          />
        )}
      </div>
    </div>
  );
}
