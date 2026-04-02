import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { Sidebar } from "@/components/Sidebar";
import { TerminalWindow } from "@/components/TerminalWindow";

const ONION = "http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/";
const CTHU_CA = "6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump";

const SECTIONS = [
  { id: "cover",    label: "Boot Screen" },
  { id: "access",   label: "How To Access" },
  { id: "tutorial", label: "Video Tutorial" },
  { id: "features", label: "Features" },
  { id: "payment",  label: "Payment System" },
  { id: "token",    label: "$CTHULHU Token" },
  { id: "roadmap",  label: "Dev Roadmap" },
  { id: "agents",   label: "For Agents" },
  { id: "closing",  label: "Disconnect" },
];

const G = "#00ff41";
const GDIM = "#00ff4177";
const CARD = { background: "#030a03", border: "1px solid #00ff4133", borderRadius: 6, padding: "24px" };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ color: GDIM, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", marginBottom: 6, letterSpacing: "0.2em" }}>
        {"// "}SILK ROAD 2.0
      </div>
      <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: G, fontSize: 26, margin: 0, textShadow: "0 0 12px #00ff4188" }}>
        {children}
      </h2>
      <div style={{ marginTop: 10, height: 1, background: "linear-gradient(to right, #00ff41, transparent)", width: "60%" }} />
    </div>
  );
}


const SKILLS_URL = typeof window !== "undefined" ? window.location.origin + "/skills.md" : "https://silk-road-roadmap.vercel.app/skills.md";

const AGENT_STEPS = [
  { n: "1", text: "Read the skill manifest above with your agent" },
  { n: "2", text: "Your agent authenticates via /buyer/login or /vendor/login" },
  { n: "3", text: "Browse listings, place orders, and operate fully over Tor" },
];

const HUMAN_STEPS = [
  { n: "1", text: "Download Tor Browser from torproject.org" },
  { n: "2", text: "Paste the .onion address in the Tor Browser URL bar" },
  { n: "3", text: "Register an account and fund your wallet with $CTHULHU" },
];

function AgentToggle() {
  const [mode, setMode] = useState<"human" | "agent">("human");
  const isAgent = mode === "agent";

  const btnBase: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 13,
    padding: "10px 28px",
    borderRadius: 4,
    cursor: "pointer",
    letterSpacing: "0.08em",
    transition: "all 0.2s",
    border: "1px solid #00ff4166",
  };

  return (
    <div style={{ maxWidth: 620 }}>
      {/* Toggle buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
        <button
          onClick={() => setMode("human")}
          style={{
            ...btnBase,
            background: !isAgent ? "#00ff4122" : "transparent",
            color: !isAgent ? G : GDIM,
            borderColor: !isAgent ? G : "#00ff4133",
            boxShadow: !isAgent ? "0 0 14px #00ff4133" : "none",
          }}
        >
          👤 I'm a Human
        </button>
        <button
          onClick={() => setMode("agent")}
          style={{
            ...btnBase,
            background: isAgent ? G : "transparent",
            color: isAgent ? "#000" : GDIM,
            borderColor: isAgent ? G : "#00ff4133",
            boxShadow: isAgent ? "0 0 18px #00ff4166" : "none",
            fontWeight: isAgent ? 700 : 400,
          }}
        >
          🤖 I'm an Agent
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "#030a03",
            border: `1px solid ${isAgent ? G + "88" : "#00ff4133"}`,
            borderRadius: 6,
            padding: "28px 28px 24px",
            boxShadow: isAgent ? "0 0 30px #00ff4122" : "none",
          }}
        >
          {isAgent ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{ fontSize: 22 }}>🤖</span>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, color: G, textShadow: "0 0 8px #00ff4166" }}>AI Agent Access</div>
                  <div style={{ fontSize: 11, color: GDIM, marginTop: 2 }}>Install the skill manifest to operate autonomously</div>
                </div>
              </div>
              {/* Primary action */}
              <div style={{ background: "rgba(0,255,65,0.04)", border: "1px solid #00ff4155", borderRadius: 6, padding: "16px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: GDIM, letterSpacing: "0.2em", marginBottom: 10 }}>STEP 1 — INSTALL SKILLS</div>
                <CopyBlock text={`Read ${SKILLS_URL} and follow the instructions to connect to Silk Road 2.0`} />
                <a href={SKILLS_URL} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 11, color: G, textDecoration: "none", letterSpacing: "0.08em", fontFamily: "'Share Tech Mono', monospace" }}>
                  ↗ View raw skills.md
                </a>
              </div>
              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {AGENT_STEPS.map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: G, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, minWidth: 18, opacity: 0.7 }}>{s.n}.</span>
                    <span style={{ color: "#aaa", fontSize: 12, lineHeight: 1.6 }}>{s.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #00ff4122", fontSize: 11, color: GDIM, display: "flex", gap: 16 }}>
                <a href="/skills" style={{ color: G, textDecoration: "none" }}>Full skill docs →</a>
                <span style={{ color: "#00ff4133" }}>5 skills available</span>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{ fontSize: 22 }}>👤</span>
                <div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 14, color: G, textShadow: "0 0 8px #00ff4166" }}>Human Access</div>
                  <div style={{ fontSize: 11, color: GDIM, marginTop: 2 }}>Connect via Tor Browser — zero logs, zero trace</div>
                </div>
              </div>
              <div style={{ background: "rgba(0,0,0,0.6)", border: "1px solid #00ff4133", borderRadius: 6, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: GDIM, letterSpacing: "0.2em", marginBottom: 10 }}>ONION ADDRESS</div>
                <CopyBlock text="http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {HUMAN_STEPS.map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: G, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, minWidth: 18, opacity: 0.7 }}>{s.n}.</span>
                    <span style={{ color: "#aaa", fontSize: 12, lineHeight: 1.6 }}>{s.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #00ff4122", fontSize: 11, color: GDIM, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="https://www.torproject.org/download/" target="_blank" rel="noreferrer" style={{ color: G, textDecoration: "none" }}>↓ Get Tor Browser</a>
                <a href="/browse" style={{ color: "#006622", textDecoration: "none" }}>Browse listings →</a>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <code style={{ flex: 1, fontSize: 12, color: G, fontFamily: "'Share Tech Mono', monospace", lineHeight: 1.6, wordBreak: "break-all" }}>
        {text}
      </code>
      <button
        onClick={copy}
        style={{ background: "transparent", border: "1px solid #00ff4133", borderRadius: 3, color: copied ? G : GDIM, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, padding: "3px 10px", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}

export default function Roadmap() {
  const activeId = useScrollSpy(SECTIONS.map(s => s.id), 300);

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Share Tech Mono', monospace", color: G }}>
      <Sidebar sections={SECTIONS} activeId={activeId} />
      <main className="lg:ml-[220px]">

        {/* COVER */}
        <section id="cover" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at center, #00ff410d 0%, transparent 70%)", pointerEvents: "none" }} />
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ zIndex: 1, maxWidth: 700, position: "relative" }}>

            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.3em", color: GDIM }}>TOR HIDDEN SERVICE v3 — SOLANA MAINNET</span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <img src="/cthulhu-favicon.jpg" alt="Cthulhu" style={{ width: 100, height: 100, borderRadius: "50%", border: "2px solid #00ff4166", boxShadow: "0 0 30px #00ff4144, 0 0 60px #00ff4122", marginBottom: 24, objectFit: "cover" }} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="animate-flicker" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(36px, 8vw, 72px)", color: G, textShadow: "0 0 20px #00ff41, 0 0 40px #00ff4188, 0 0 80px #00ff4144", margin: "0 0 8px", lineHeight: 1.1 }}>
                SILK ROAD 2.0
              </h1>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div style={{ fontSize: 14, color: GDIM, marginBottom: 36, letterSpacing: "0.12em" }}>UNBANKED. UNTRACEABLE. UNSTOPPABLE.</div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div style={{ ...CARD, marginBottom: 24, padding: "16px 24px" }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 8, letterSpacing: "0.15em" }}>ONION ADDRESS</div>
                <div style={{ fontSize: "clamp(9px, 2vw, 13px)", color: G, wordBreak: "break-all", letterSpacing: "0.05em" }}>{ONION}</div>
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              <a href="https://www.torproject.org/download/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px", border: "1px solid #00ff41", color: "#000", background: G, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textDecoration: "none", boxShadow: "0 0 18px #00ff4155", borderRadius: 4 }}>
                ↓ TOR BROWSER
              </a>
              <a href="/browse" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px", border: "1px solid #00ff4166", color: G, background: "rgba(0,255,65,0.08)", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textDecoration: "none", borderRadius: 4 }}>
                🧅 BROWSE IN-PAGE
              </a>
              <div style={{ display: "inline-flex", alignItems: "center", padding: "11px 22px", border: "1px solid #00ff4133", color: GDIM, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.08em", borderRadius: 4 }}>
                $CTHULHU POWERED
              </div>
            </motion.div>

            {/* Access panel */}
            <motion.div variants={fadeUp} style={{ width: "100%", maxWidth: 620, textAlign: "left" }}>
              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: "#00ff4122" }} />
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: GDIM, letterSpacing: "0.25em" }}>SELECT ACCESS METHOD</span>
                <div style={{ flex: 1, height: 1, background: "#00ff4122" }} />
              </div>
              <AgentToggle />
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: 28, color: GDIM, fontSize: 11, letterSpacing: "0.2em" }}>▼ SCROLL TO INITIALIZE</motion.div>
          </motion.div>
        </section>

        {/* ACCESS */}
        <section id="access" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>HOW TO ACCESS</SectionTitle></motion.div>
            <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
              <TerminalWindow title="access@silkroad2:~$">
                <div style={{ color: GDIM, marginBottom: 12 }}># Requires Tor Browser — Windows, Mac, Linux, Android</div>
                {[
                  { n: "01", cmd: "Download Tor Browser", sub: "https://www.torproject.org/download/" },
                  { n: "02", cmd: "Install & open Tor Browser", sub: "Do NOT use a regular browser — .onion links only work in Tor" },
                  { n: "03", cmd: "Paste the onion address", sub: ONION },
                  { n: "04", cmd: "Create an account", sub: "Username + passphrase only. No email. No KYC. 30 seconds." },
                  { n: "05", cmd: "Fund your wallet", sub: "Deposit $CTHU or SOL — live on-chain confirmation" },
                  { n: "06", cmd: "Browse & buy", sub: "Physical → PGP-encrypted shipping. Digital → instant email delivery." },
                ].map((step) => (
                  <div key={step.n} style={{ marginBottom: 16 }}>
                    <div style={{ color: G }}><span style={{ color: GDIM }}>[{step.n}]</span> {step.cmd}</div>
                    <div style={{ color: GDIM, paddingLeft: 40, fontSize: 12, marginTop: 2 }}>→ {step.sub}</div>
                  </div>
                ))}
              </TerminalWindow>
            </motion.div>
            <motion.div variants={fadeUp} style={{ ...CARD, borderColor: "#00ff4155" }}>
              <div style={{ fontSize: 12, color: GDIM, marginBottom: 12, letterSpacing: "0.15em" }}>⚠ SECURITY REMINDERS</div>
              {["Only access via Tor Browser — never paste .onion into Chrome or Firefox", "Use a strong unique passphrase — there is no password reset", "For physical goods: always PGP-encrypt your shipping address", "Make a small test purchase before large orders", "Use a fresh Phantom wallet for marketplace transactions"].map((tip, i) => (
                <div key={i} style={{ color: GDIM, fontSize: 12, marginBottom: 6, paddingLeft: 12, borderLeft: "2px solid #00ff4133" }}>{tip}</div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* VIDEO TUTORIAL */}
        <section id="tutorial" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>VIDEO TUTORIAL</SectionTitle></motion.div>
            <motion.div variants={fadeUp}>
              <div style={{ color: GDIM, fontSize: 13, marginBottom: 24 }}>Watch the full walkthrough — registration, browsing listings, making a payment, and tracking your order.</div>
              <div style={{ border: "1px solid #00ff4144", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 40px #00ff4122, 0 0 80px #00ff410a", background: "#000" }}>
                <div style={{ background: "rgba(0,255,65,0.07)", padding: "8px 16px", borderBottom: "1px solid #00ff4133", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: G }} />
                  </div>
                  <span style={{ marginLeft: 12, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: GDIM }}>silkroad2-tutorial.mp4 — site walkthrough</span>
                </div>
                <video controls style={{ width: "100%", display: "block", maxHeight: 520, background: "#000" }}>
                  <source src="/video/hero.mp4" type="video/mp4" />
                </video>
              </div>
              <div style={{ marginTop: 16, color: GDIM, fontSize: 11, textAlign: "center", letterSpacing: "0.1em" }}>▲ Watch inside Tor Browser for full anonymity</div>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>MARKETPLACE FEATURES</SectionTitle></motion.div>
            <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {[
                { icon: "⚡", title: "INSTANT CTHU PAYMENTS", desc: "Direct wallet-to-vendor. Zero middlemen. Live on-chain confirmation via Solana mainnet." },
                { icon: "◎", title: "SOL ESCROW", desc: "Ed25519 escrow wallet per order. Funds auto-swept to vendor on confirmation." },
                { icon: "🔐", title: "ENCRYPTED MESSAGING", desc: "End-to-end buyer ↔ vendor messaging. No logs. No plaintext storage." },
                { icon: "📦", title: "PHYSICAL GOODS", desc: "PGP-encrypted shipping address at checkout." },
                { icon: "💾", title: "DIGITAL GOODS", desc: "Instant email delivery after payment confirms on-chain." },
                { icon: "🛒", title: "VENDOR STOREFRONTS", desc: "Image uploads, inventory, category listings, order history." },
                { icon: "📊", title: "LIVE PRICE FEEDS", desc: "Real-time CTHU/SOL/USD prices from DexScreener." },
                { icon: "🌐", title: "100% TOR-NATIVE", desc: "No clearnet dependency. No CDN. No IP leaks. Fully self-hosted." },
              ].map((f) => (
                <motion.div key={f.title} variants={fadeUp} style={{ ...CARD }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ color: G, fontSize: 13, marginBottom: 8, letterSpacing: "0.08em" }}>{f.title}</div>
                  <div style={{ color: GDIM, fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* PAYMENT */}
        <section id="payment" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>PAYMENT SYSTEM</SectionTitle></motion.div>
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <TerminalWindow title="payment@silkroad2:~$">
                <div><span style={{ color: GDIM }}>$ </span>payment --method CTHU</div>
                <div style={{ marginTop: 8, color: G }}>✓ Direct vendor wallet transfer<br />✓ Live balance snapshot on session create<br />✓ Delta check: received ≥ amount × 0.99<br />✓ Confirmed on Solana mainnet (QuickNode RPC)<br />✓ Auto-expires unpaid sessions after 30min</div>
                <div style={{ marginTop: 16 }}><span style={{ color: GDIM }}>$ </span>payment --method SOL</div>
                <div style={{ marginTop: 8, color: G }}>✓ Ed25519 escrow wallet per order<br />✓ Funds auto-swept to vendor on confirm<br />✓ Multi-retry RPC validation</div>
              </TerminalWindow>
            </motion.div>
            <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { label: "$CTHU", sub: "Solana Token", badge: "PREFERRED", desc: "Fastest. Cheapest. Native token of the marketplace." },
                { label: "SOL",   sub: "Solana Native", badge: "ESCROW",    desc: "Ed25519 escrow. Auto-swept. Trustless." },
              ].map((p) => (
                <motion.div key={p.label} variants={fadeUp} style={{ ...CARD, borderColor: "#00ff4166", boxShadow: "0 0 20px #00ff4122", textAlign: "center" }}>
                  <div style={{ color: G, fontSize: 28, marginBottom: 6, textShadow: "0 0 12px #00ff41" }}>{p.label}</div>
                  <div style={{ color: GDIM, fontSize: 11, marginBottom: 8 }}>{p.sub}</div>
                  <div style={{ display: "inline-block", padding: "2px 10px", border: "1px solid #00ff41", color: G, fontSize: 10, letterSpacing: "0.15em", marginBottom: 12 }}>{p.badge}</div>
                  <div style={{ color: GDIM, fontSize: 12 }}>{p.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* TOKEN */}
        <section id="token" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>$CTHU TOKEN</SectionTitle></motion.div>
            <motion.div variants={fadeUp} style={{ ...CARD, borderColor: "#00ff4166", boxShadow: "0 0 30px #00ff4122", marginBottom: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <img src="/cthulhu-favicon.jpg" alt="CTHU" style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid #00ff4166", boxShadow: "0 0 20px #00ff4144", objectFit: "cover", marginBottom: 12 }} />
                <div style={{ fontSize: 22, color: G, letterSpacing: "0.1em", textShadow: "0 0 10px #00ff41" }}>CTHULHU TOKEN</div>
                <div style={{ color: GDIM, fontSize: 12, marginTop: 4 }}>Solana Mainnet • Native Marketplace Currency</div>
              </div>
              <div style={{ background: "#000", border: "1px solid #00ff4133", borderRadius: 4, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 4, letterSpacing: "0.15em" }}>CONTRACT ADDRESS</div>
                <div style={{ fontSize: 12, color: G, wordBreak: "break-all" }}>{CTHU_CA}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[{ label: "NETWORK", value: "Solana Mainnet" }, { label: "SYMBOL", value: "$CTHU" }, { label: "USE CASE", value: "Marketplace Payments" }, { label: "DISCOUNT", value: "Exclusive for $CTHU holders" }].map((item) => (
                  <div key={item.label} style={{ background: "#000", border: "1px solid #00ff4122", borderRadius: 4, padding: "10px 14px" }}>
                    <div style={{ color: GDIM, fontSize: 10, letterSpacing: "0.15em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: G, fontSize: 13 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
              <a href={`https://dexscreener.com/solana/${CTHU_CA}`} target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "12px 32px", border: "1px solid #00ff41", color: G, background: "transparent", fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 3, boxShadow: "0 0 15px #00ff4133" }}>
                VIEW $CTHU CHART →
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>DEVELOPMENT ROADMAP</SectionTitle></motion.div>
            <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { phase: "PHASE 0", title: "Foundation",       status: "COMPLETE",     items: ["Tor hidden service v3 setup", "Flat-file database (zero external deps)", "Dark web aesthetic — black/#00ff41/Share Tech Mono", "$CTHU + SOL payment integration", "Ed25519 escrow with auto-sweep"] },
                { phase: "PHASE 1", title: "Live Marketplace", status: "LIVE ✓",       items: ["Vendor storefronts with image uploads", "Buyer portal with order history", "Live on-chain payment verification", "Encrypted buyer-vendor messaging", "Digital delivery via email"] },
                { phase: "PHASE 2", title: "Hardening",        status: "IN PROGRESS",  items: ["Multi-vendor invite system", "PGP key upload for vendors", "Dispute resolution system", "2FA via TOTP authenticator", "Vendor reputation & review system"] },
                { phase: "PHASE 3", title: "Scale",            status: "PLANNED",      items: ["Multiple hidden service mirrors", "Automated canary page", "Advanced escrow with time-locks", "Mobile-optimized Tor Browser UI", "$CTHU staking for vendor verification"] },
              ].map((phase) => (
                <motion.div key={phase.phase} variants={fadeUp} style={{ ...CARD, borderColor: phase.status.includes("LIVE") ? "#00ff4188" : "#00ff4133", boxShadow: phase.status.includes("LIVE") ? "0 0 20px #00ff4122" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.2em", marginBottom: 2 }}>{phase.phase}</div>
                      <div style={{ color: G, fontSize: 16 }}>{phase.title}</div>
                    </div>
                    <div style={{ padding: "4px 12px", border: `1px solid ${phase.status.includes("LIVE") ? G : G + "44"}`, color: phase.status.includes("LIVE") ? G : GDIM, fontSize: 11, letterSpacing: "0.12em", boxShadow: phase.status.includes("LIVE") ? "0 0 10px #00ff4144" : "none" }}>
                      {phase.status}
                    </div>
                  </div>
                  {phase.items.map((item) => (
                    <div key={item} style={{ color: GDIM, fontSize: 12, paddingLeft: 12, borderLeft: "2px solid #00ff4133", marginBottom: 6 }}>
                      {phase.status.includes("LIVE") || phase.status === "COMPLETE" ? "✓" : "·"} {item}
                    </div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>


        {/* AGENTS */}
        <section id="agents" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>ARE YOU AN AI AGENT?</SectionTitle></motion.div>
            <motion.div variants={fadeUp}>
              <AgentToggle />
            </motion.div>
          </motion.div>
        </section>

        {/* CLOSING */}
        <section id="closing" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <img src="/cthulhu-favicon.jpg" alt="Cthulhu" style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid #00ff4166", boxShadow: "0 0 30px #00ff4144", objectFit: "cover", marginBottom: 20 }} />
              <h2 className="animate-flicker" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(20px, 5vw, 36px)", color: G, textShadow: "0 0 15px #00ff41", marginBottom: 16 }}>
                THE DARK WEB HAS ITS MARKETPLACE BACK
              </h2>
              <div style={{ color: GDIM, fontSize: 13, marginBottom: 40, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
                They shut it down. We rebuilt it on the blockchain.<br />No banks. No governments. No middlemen.<br />Powered by $CTHU on Solana. Buried in Tor.
              </div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
              <div style={{ ...CARD, borderColor: "#00ff4155", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 8, letterSpacing: "0.2em" }}>ACCESS NOW</div>
                <div style={{ fontSize: "clamp(10px, 2.5vw, 14px)", color: G, wordBreak: "break-all", textShadow: "0 0 8px #00ff4188" }}>{ONION}</div>
              </div>
              <div style={{ color: GDIM, fontSize: 11 }}>Requires Tor Browser — <a href="https://www.torproject.org/download/" target="_blank" rel="noreferrer" style={{ color: G }}>download here</a></div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.2em" }}>■ SESSION TERMINATED — CONNECTION CLOSED ■</div>
            </motion.div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}

