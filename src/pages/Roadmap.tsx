import { motion } from "framer-motion";
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
  { id: "token",    label: "$CTHU Token" },
  { id: "roadmap",  label: "Dev Roadmap" },
  { id: "closing",  label: "Disconnect" },
];

const G = "#00ff41";
const GDIM = "#00ff4177";
const CARD = { background: "#030a03", border: `1px solid #00ff4133`, borderRadius: 6, padding: "24px" };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ color: GDIM, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", marginBottom: 6, letterSpacing: "0.2em" }}>
        {"// "}SILK ROAD 2.0
      </div>
      <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: G, fontSize: 26, margin: 0, textShadow: `0 0 12px #00ff4188` }}>
        {children}
      </h2>
      <div style={{ marginTop: 10, height: 1, background: `linear-gradient(to right, ${G}, transparent)`, width: "60%" }} />
    </div>
  );
}

export default function Roadmap() {
  const activeId = useScrollSpy(SECTIONS.map(s => s.id), 300);

  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Share Tech Mono', monospace", color: G }}>
      <Sidebar sections={SECTIONS} activeId={activeId} />

      <main className="lg:ml-[220px]">

        {/* SECTION 0: COVER */}
        <section id="cover" style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(ellipse at center, #00ff410d 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ zIndex: 1, maxWidth: 700, position: "relative" }}>
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.3em", color: GDIM }}>
                TOR HIDDEN SERVICE v3 — SOLANA MAINNET
              </span>
            </motion.div>

            <motion.div variants={fadeUp}>
              <img
                src="/cthulhu-favicon.jpg"
                alt="Cthulhu"
                style={{
                  width: 100, height: 100,
                  borderRadius: "50%",
                  border: `2px solid #00ff4166`,
                  boxShadow: `0 0 30px #00ff4144, 0 0 60px #00ff4122`,
                  marginBottom: 24,
                  objectFit: "cover",
                }}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="animate-flicker" style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(36px, 8vw, 72px)",
                color: G,
                textShadow: `0 0 20px ${G}, 0 0 40px #00ff4188, 0 0 80px #00ff4144`,
                margin: "0 0 8px",
                lineHeight: 1.1,
              }}>
                SILK ROAD 2.0
              </h1>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div style={{ fontSize: 14, color: GDIM, marginBottom: 36, letterSpacing: "0.12em" }}>
                UNBANKED. UNTRACEABLE. UNSTOPPABLE.
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div style={{ ...CARD, marginBottom: 32, padding: "16px 24px" }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 8, letterSpacing: "0.15em" }}>ONION ADDRESS</div>
                <div style={{ fontSize: "clamp(9px, 2vw, 13px)", color: G, wordBreak: "break-all", letterSpacing: "0.05em" }}>
                  {ONION}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://www.torproject.org/download/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block", padding: "12px 28px",
                  border: `1px solid ${G}`, color: "#000", background: G,
                  fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.1em",
                  textDecoration: "none", boxShadow: `0 0 20px #00ff4166`, borderRadius: 3,
                }}
              >
                ↓ DOWNLOAD TOR BROWSER
              </a>
              <div style={{
                padding: "12px 28px", border: `1px solid #00ff4155`, color: G,
                fontFamily: "'Share Tech Mono', monospace", fontSize: 13, letterSpacing: "0.1em", borderRadius: 3,
              }}>
                $CTHU POWERED
              </div>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: 48, color: GDIM, fontSize: 11, letterSpacing: "0.2em" }}>
              ▼ SCROLL TO INITIALIZE
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 1: ACCESS */}
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
            <motion.div variants={fadeUp} style={{ ...CARD, borderColor: `${G}55` }}>
              <div style={{ fontSize: 12, color: GDIM, marginBottom: 12, letterSpacing: "0.15em" }}>⚠ SECURITY REMINDERS</div>
              {[
                "Only access via Tor Browser — never paste .onion into Chrome or Firefox",
                "Use a strong unique passphrase — there is no password reset",
                "For physical goods: always PGP-encrypt your shipping address",
                "Make a small test purchase before large orders",
                "Use a fresh Phantom wallet for marketplace transactions",
              ].map((tip, i) => (
                <div key={i} style={{ color: GDIM, fontSize: 12, marginBottom: 6, paddingLeft: 12, borderLeft: `2px solid #00ff4133` }}>{tip}</div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 2: VIDEO TUTORIAL */}
        <section id="tutorial" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>VIDEO TUTORIAL</SectionTitle></motion.div>
            <motion.div variants={fadeUp}>
              <div style={{ color: GDIM, fontSize: 13, marginBottom: 24 }}>
                Watch the full walkthrough — registration, browsing listings, making a payment, and tracking your order.
              </div>
              <div style={{
                border: `1px solid #00ff4144`,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: `0 0 40px #00ff4122, 0 0 80px #00ff410a`,
                background: "#000",
              }}>
                {/* Terminal title bar */}
                <div style={{
                  background: "rgba(0,255,65,0.07)",
                  padding: "8px 16px",
                  borderBottom: `1px solid #00ff4133`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: G }} />
                  </div>
                  <span style={{ marginLeft: 12, fontFamily: "'Share Tech Mono', monospace", fontSize: 11, color: GDIM }}>
                    silkroad2-tutorial.mp4 — site walkthrough
                  </span>
                </div>
                <video
                  controls
                  style={{ width: "100%", display: "block", maxHeight: 520, background: "#000" }}
                >
                  <source src="/video/hero.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
              <div style={{ marginTop: 16, color: GDIM, fontSize: 11, textAlign: "center", letterSpacing: "0.1em" }}>
                ▲ Watch inside Tor Browser for full anonymity
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 3: FEATURES */}
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
            <motion.div variants={fadeUp} style={{ marginTop: 16 }}>
              <a href="/browse" style={{ display: "inline-block", padding: "10px 24px", border: "1px solid #00ff4155", color: "#00ff4199", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 3 }}>
                🧅 BROWSE SITE IN-PAGE →
              </a>
            </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 4: PAYMENT */}
        <section id="payment" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>PAYMENT SYSTEM</SectionTitle></motion.div>
            <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
              <TerminalWindow title="payment@silkroad2:~$">
                <div><span style={{ color: GDIM }}>$ </span>payment --method CTHU</div>
                <div style={{ marginTop: 8, color: G }}>
                  ✓ Direct vendor wallet transfer<br />
                  ✓ Live balance snapshot on session create<br />
                  ✓ Delta check: received ≥ amount × 0.99<br />
                  ✓ Confirmed on Solana mainnet (QuickNode RPC)<br />
                  ✓ Auto-expires unpaid sessions after 30min
                </div>
                <div style={{ marginTop: 16 }}><span style={{ color: GDIM }}>$ </span>payment --method SOL</div>
                <div style={{ marginTop: 8, color: G }}>
                  ✓ Ed25519 escrow wallet per order<br />
                  ✓ Funds auto-swept to vendor on confirm<br />
                  ✓ Multi-retry RPC validation
                </div>
              </TerminalWindow>
            </motion.div>
            <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { label: "$CTHU", sub: "Solana Token", badge: "PREFERRED", desc: "Fastest. Cheapest. Native token of the marketplace." },
                { label: "SOL", sub: "Solana Native", badge: "ESCROW", desc: "Ed25519 escrow. Auto-swept. Trustless." },
              ].map((p) => (
                <motion.div key={p.label} variants={fadeUp} style={{ ...CARD, borderColor: `${G}66`, boxShadow: `0 0 20px #00ff4122`, textAlign: "center" }}>
                  <div style={{ color: G, fontSize: 28, marginBottom: 6, textShadow: `0 0 12px ${G}` }}>{p.label}</div>
                  <div style={{ color: GDIM, fontSize: 11, marginBottom: 8 }}>{p.sub}</div>
                  <div style={{ display: "inline-block", padding: "2px 10px", border: `1px solid ${G}`, color: G, fontSize: 10, letterSpacing: "0.15em", marginBottom: 12 }}>{p.badge}</div>
                  <div style={{ color: GDIM, fontSize: 12 }}>{p.desc}</div>
                </motion.div>
            <motion.div variants={fadeUp} style={{ marginTop: 16 }}>
              <a href="/browse" style={{ display: "inline-block", padding: "10px 24px", border: "1px solid #00ff4155", color: "#00ff4199", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 3 }}>
                🧅 BROWSE SITE IN-PAGE →
              </a>
            </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 5: TOKEN */}
        <section id="token" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>$CTHU TOKEN</SectionTitle></motion.div>
            <motion.div variants={fadeUp} style={{ ...CARD, borderColor: `${G}66`, boxShadow: `0 0 30px #00ff4122`, marginBottom: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <img src="/cthulhu-favicon.jpg" alt="CTHU" style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid #00ff4166`, boxShadow: `0 0 20px #00ff4144`, objectFit: "cover", marginBottom: 12 }} />
                <div style={{ fontSize: 22, color: G, letterSpacing: "0.1em", textShadow: `0 0 10px ${G}` }}>CTHULHU TOKEN</div>
                <div style={{ color: GDIM, fontSize: 12, marginTop: 4 }}>Solana Mainnet • Native Marketplace Currency</div>
              </div>
              <div style={{ background: "#000", border: `1px solid #00ff4133`, borderRadius: 4, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 4, letterSpacing: "0.15em" }}>CONTRACT ADDRESS</div>
                <div style={{ fontSize: 12, color: G, wordBreak: "break-all" }}>{CTHU_CA}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {[
                  { label: "NETWORK", value: "Solana Mainnet" },
                  { label: "SYMBOL", value: "$CTHU" },
                  { label: "USE CASE", value: "Marketplace Payments" },
                  { label: "DISCOUNT", value: "Exclusive for $CTHU holders" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#000", border: `1px solid #00ff4122`, borderRadius: 4, padding: "10px 14px" }}>
                    <div style={{ color: GDIM, fontSize: 10, letterSpacing: "0.15em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ color: G, fontSize: 13 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
              <a href={`https://dexscreener.com/solana/${CTHU_CA}`} target="_blank" rel="noreferrer" style={{
                display: "inline-block", padding: "12px 32px", border: `1px solid ${G}`, color: G,
                background: "transparent", fontFamily: "'Share Tech Mono', monospace", fontSize: 13,
                letterSpacing: "0.1em", textDecoration: "none", borderRadius: 3, boxShadow: `0 0 15px #00ff4133`,
              }}>
                VIEW $CTHU CHART →
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 6: ROADMAP */}
        <section id="roadmap" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionTitle>DEVELOPMENT ROADMAP</SectionTitle></motion.div>
            <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { phase: "PHASE 0", title: "Foundation", status: "COMPLETE", items: ["Tor hidden service v3 setup", "Flat-file database (zero external deps)", "Dark web aesthetic — black/#00ff41/Share Tech Mono", "$CTHU + SOL payment integration", "Ed25519 escrow with auto-sweep"] },
                { phase: "PHASE 1", title: "Live Marketplace", status: "LIVE ✓", items: ["Vendor storefronts with image uploads", "Buyer portal with order history", "Live on-chain payment verification", "Encrypted buyer-vendor messaging", "Digital delivery via email"] },
                { phase: "PHASE 2", title: "Hardening", status: "IN PROGRESS", items: ["Multi-vendor invite system", "PGP key upload for vendors", "Dispute resolution system", "2FA via TOTP authenticator", "Vendor reputation & review system"] },
                { phase: "PHASE 3", title: "Scale", status: "PLANNED", items: ["Multiple hidden service mirrors", "Automated canary page", "Advanced escrow with time-locks", "Mobile-optimized Tor Browser UI", "$CTHU staking for vendor verification"] },
              ].map((phase) => (
                <motion.div key={phase.phase} variants={fadeUp} style={{ ...CARD, borderColor: phase.status.includes("LIVE") ? `${G}88` : `${G}33`, boxShadow: phase.status.includes("LIVE") ? `0 0 20px #00ff4122` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.2em", marginBottom: 2 }}>{phase.phase}</div>
                      <div style={{ color: G, fontSize: 16 }}>{phase.title}</div>
                    </div>
                    <div style={{ padding: "4px 12px", border: `1px solid ${phase.status.includes("LIVE") ? G : G + "44"}`, color: phase.status.includes("LIVE") ? G : GDIM, fontSize: 11, letterSpacing: "0.12em", boxShadow: phase.status.includes("LIVE") ? `0 0 10px #00ff4144` : "none" }}>
                      {phase.status}
                    </div>
                  </div>
                  {phase.items.map((item) => (
                    <div key={item} style={{ color: GDIM, fontSize: 12, paddingLeft: 12, borderLeft: `2px solid #00ff4133`, marginBottom: 6 }}>
                      {phase.status.includes("LIVE") || phase.status === "COMPLETE" ? "✓" : "·"} {item}
                    </div>
                  ))}
                </motion.div>
            <motion.div variants={fadeUp} style={{ marginTop: 16 }}>
              <a href="/browse" style={{ display: "inline-block", padding: "10px 24px", border: "1px solid #00ff4155", color: "#00ff4199", fontFamily: "'Share Tech Mono', monospace", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none", borderRadius: 3 }}>
                🧅 BROWSE SITE IN-PAGE →
              </a>
            </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 7: CLOSING */}
        <section id="closing" style={{ padding: "80px 40px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <img src="/cthulhu-favicon.jpg" alt="Cthulhu" style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid #00ff4166`, boxShadow: `0 0 30px #00ff4144`, objectFit: "cover", marginBottom: 20 }} />
              <h2 className="animate-flicker" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(20px, 5vw, 36px)", color: G, textShadow: `0 0 15px ${G}`, marginBottom: 16 }}>
                THE DARK WEB HAS ITS MARKETPLACE BACK
              </h2>
              <div style={{ color: GDIM, fontSize: 13, marginBottom: 40, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
                They shut it down. We rebuilt it on the blockchain.<br />
                No banks. No governments. No middlemen.<br />
                Powered by $CTHU on Solana. Buried in Tor.
              </div>
            </motion.div>
            <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
              <div style={{ ...CARD, borderColor: `${G}55`, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: GDIM, marginBottom: 8, letterSpacing: "0.2em" }}>ACCESS NOW</div>
                <div style={{ fontSize: "clamp(10px, 2.5vw, 14px)", color: G, wordBreak: "break-all", textShadow: `0 0 8px #00ff4188` }}>{ONION}</div>
              </div>
              <div style={{ color: GDIM, fontSize: 11 }}>
                Requires Tor Browser — <a href="https://www.torproject.org/download/" target="_blank" rel="noreferrer" style={{ color: G }}>download here</a>
              </div>
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
