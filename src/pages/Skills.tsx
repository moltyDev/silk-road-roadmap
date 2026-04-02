import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";

const G = "#00ff41";
const GDIM = "#00ff4177";
const CARD = { background: "#030a03", border: "1px solid #00ff4133", borderRadius: 6, padding: "24px 28px" };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

const ONION = "http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api";
const CTHU_CA = "6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump";

const SECTIONS = [
  { id: "overview",   label: "Overview" },
  { id: "buyer",      label: "Shopping Agent" },
  { id: "vendor",     label: "Vendor Agent" },
  { id: "price",      label: "Price Watcher" },
  { id: "escrow",     label: "Escrow Monitor" },
  { id: "onboarding", label: "Onboarding Bot" },
  { id: "api",        label: "API Reference" },
  { id: "install",    label: "Install" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ color: GDIM, fontSize: 11, fontFamily: "'Share Tech Mono', monospace", marginBottom: 6, letterSpacing: "0.2em" }}>
        {"// "}OPENCLAW SKILL LIBRARY
      </div>
      <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: G, fontSize: 24, margin: 0, textShadow: "0 0 12px #00ff4188" }}>
        {children}
      </h2>
      <div style={{ marginTop: 10, height: 1, background: "linear-gradient(to right, #00ff41, transparent)", width: "60%" }} />
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre style={{
      background: "#000",
      border: "1px solid #00ff4122",
      borderRadius: 4,
      padding: "16px 18px",
      fontSize: 12,
      color: "#00ff41",
      overflowX: "auto",
      fontFamily: "'Share Tech Mono', monospace",
      lineHeight: 1.6,
      margin: "16px 0",
    }}><code>{code.trim()}</code></pre>
  );
}

function SkillBadge({ label, color = G }: { label: string; color?: string }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 11,
      color: "#000",
      background: color,
      borderRadius: 3,
      padding: "2px 8px",
      marginRight: 8,
      fontWeight: 700,
      letterSpacing: "0.1em",
    }}>{label}</span>
  );
}

const SKILLS = [
  {
    id: "buyer",
    slug: "silkroad2-buyer",
    label: "SR2 Shopping Agent",
    version: "1.0.0",
    status: "STABLE",
    statusColor: G,
    role: "Buyer",
    description: "Your agent browses listings over Tor, picks what you need, pays in $CTHU via x402, and pings you on WhatsApp when the order is placed. You never open a browser.",
    install: "openclaw skill add silkroad2-buyer",
    manifest: `{
  "skill": "silkroad2-buyer",
  "version": "1.0.0",
  "transport": "https+tor",
  "base_url": "${ONION}",
  "auth": {
    "type": "session_cookie",
    "endpoint": "/buyer/login",
    "fields": ["alias", "password"]
  },
  "payment": {
    "token": "CTHU",
    "contract": "${CTHU_CA}",
    "protocol": "x402",
    "fallback": "SOL"
  },
  "actions": [
    { "name": "browse_listings", "method": "GET",  "path": "/listings" },
    { "name": "get_listing",     "method": "GET",  "path": "/listings/:id" },
    { "name": "create_order",    "method": "POST", "path": "/payments",
      "body": ["listingId","itemName","amountCthu","paymentMethod","vendorId","vendorAlias"] },
    { "name": "get_orders",      "method": "GET",  "path": "/buyer/orders" },
    { "name": "confirm_delivery","method": "POST", "path": "/orders/:id/confirm" },
    { "name": "send_message",    "method": "POST", "path": "/messages/:orderId" }
  ],
  "triggers": [
    { "event": "order.paid",      "notify": ["whatsapp","telegram"] },
    { "event": "order.shipped",   "notify": ["whatsapp","telegram"] },
    { "event": "order.completed", "notify": ["whatsapp","telegram"] }
  ]
}`,
    example: `const agent = new OpenClaw("silkroad2-buyer");

await agent.call("buyer.login", {
  alias: process.env.SR2_ALIAS,
  password: process.env.SR2_PASS,
});

const listings = await agent.call("browse_listings", {
  category: "Digital Goods",
  maxPrice: 500,
});

const session = await agent.call("create_order", {
  listingId: listings[0].id,
  itemName:  listings[0].name,
  amountCthu: listings[0].priceCthu,
  paymentMethod: "cthu",
  vendorId: listings[0].vendorId,
  vendorAlias: listings[0].vendorAlias,
});

// Pay CTHU to session.escrowAddress on Solana, then:
agent.on("order.paid", ({ order }) => {
  agent.notify("whatsapp", \`📦 Order placed! Session: \${session.sessionId}\`);
});`,
  },
  {
    id: "vendor",
    slug: "silkroad2-vendor",
    label: "SR2 Vendor Agent",
    version: "1.0.0",
    status: "STABLE",
    statusColor: G,
    role: "Vendor",
    description: "Vendors run this agent on their server. It monitors orders 24/7, auto-responds to buyer messages, flags disputes, and notifies on Telegram the second a payment hits escrow.",
    install: "openclaw skill add silkroad2-vendor",
    manifest: `{
  "skill": "silkroad2-vendor",
  "version": "1.0.0",
  "transport": "https+tor",
  "base_url": "${ONION}",
  "auth": {
    "type": "session_cookie",
    "endpoint": "/vendor/login"
  },
  "payment": {
    "receive": ["CTHU","SOL"],
    "escrow": "Ed25519",
    "auto_sweep": true
  },
  "actions": [
    { "name": "get_orders",          "method": "GET",  "path": "/vendor/orders" },
    { "name": "update_order_status", "method": "PUT",  "path": "/vendor/orders/:id/status" },
    { "name": "reply_message",       "method": "POST", "path": "/messages/:orderId" },
    { "name": "get_listings",        "method": "GET",  "path": "/vendor/listings" },
    { "name": "update_listing",      "method": "PUT",  "path": "/vendor/listings/:id" }
  ],
  "triggers": [
    { "event": "order.new",        "notify": ["telegram"], "auto_reply": true },
    { "event": "payment.received", "notify": ["telegram","webhook"] },
    { "event": "dispute.opened",   "notify": ["telegram"], "escalate_after_hours": 48 }
  ]
}`,
    example: `const agent = new OpenClaw("silkroad2-vendor");

await agent.call("vendor.login", {
  alias: process.env.SR2_VENDOR_ALIAS,
  password: process.env.SR2_VENDOR_PASS,
});

agent.on("payment.received", async ({ order, amount, token }) => {
  agent.notify("telegram", \`💰 \${amount} \${token} hit escrow — order #\${order.id}\`);
  await agent.call("update_order_status", {
    id: order.id, status: "processing"
  });
});

agent.on("dispute.opened", async ({ order }) => {
  agent.notify("telegram", \`⚠️ Dispute on order #\${order.id}\`);
  agent.scheduleEscalation(order.id, 48);
});

agent.start({ pollInterval: 30 });`,
  },
  {
    id: "price",
    slug: "silkroad2-price-watcher",
    label: "CTHU Price Watcher",
    version: "0.9.0-beta",
    status: "BETA",
    statusColor: "#ffcc00",
    role: "Trader",
    description: "Monitors $CTHU price on-chain. If it drops below your threshold it auto-buys via Jupiter. If a listing drops in price it notifies you instantly. Set it once, forget it.",
    install: "openclaw skill add silkroad2-price-watcher",
    manifest: `{
  "skill": "silkroad2-price-watcher",
  "version": "0.9.0-beta",
  "transport": "https",
  "rpc": "https://spring-red-patina.solana-mainnet.quiknode.pro/",
  "dex": "Jupiter v6",
  "token": {
    "symbol": "CTHU",
    "contract": "${CTHU_CA}",
    "decimals": 6
  },
  "actions": [
    { "name": "get_cthu_price",    "source": "DexScreener" },
    { "name": "set_buy_trigger",   "params": ["priceFloor","buyAmountUsdc","wallet"] },
    { "name": "set_listing_alert", "params": ["listingId","targetPrice","notifyOn"] },
    { "name": "auto_swap",         "dex": "Jupiter" }
  ],
  "triggers": [
    { "event": "price.below_floor",  "action": "auto_swap", "notify": ["telegram"] },
    { "event": "listing.price_drop", "notify": ["telegram","whatsapp"] },
    { "event": "price.above_target", "notify": ["telegram"] }
  ]
}`,
    example: `const watcher = new OpenClaw("silkroad2-price-watcher");

watcher.setTrigger({
  event: "price.below_floor",
  priceFloor: 0.00001,
  buyAmountUsdc: 100,
  wallet: process.env.SOLANA_WALLET_KEY,
  onTrigger: async ({ price }) => {
    watcher.notify("telegram", \`🟢 CTHU at $\${price} — auto-buying $100\`);
    await watcher.call("auto_swap", {
      fromToken: "USDC", toToken: "CTHU",
      amount: 100, slippage: 1.0,
    });
  },
});

watcher.setListingAlert({
  listingId: 42,
  targetPrice: 200,
  notifyOn: "drop",
  onAlert: ({ listing, oldPrice, newPrice }) => {
    watcher.notify("whatsapp",
      \`📉 "\${listing.title}" dropped \${oldPrice}→\${newPrice} CTHU\`);
  },
});

watcher.start({ pollInterval: 60 });`,
  },
  {
    id: "escrow",
    slug: "silkroad2-escrow-monitor",
    label: "Escrow Monitor",
    version: "0.8.0-beta",
    status: "BETA",
    statusColor: "#ffcc00",
    role: "Buyer / Vendor",
    description: "Watches all open escrows, reminds you to confirm delivery, auto-escalates disputes after X days. Never lose funds to an expired escrow window again.",
    install: "openclaw skill add silkroad2-escrow-monitor",
    manifest: `{
  "skill": "silkroad2-escrow-monitor",
  "version": "0.8.0-beta",
  "transport": "https+tor",
  "base_url": "${ONION}",
  "auth": { "type": "session_cookie" },
  "actions": [
    { "name": "list_open_escrows", "method": "GET",  "path": "/buyer/orders" },
    { "name": "confirm_delivery",  "method": "POST", "path": "/orders/:id/confirm" },
    { "name": "open_dispute",      "method": "POST", "path": "/orders/:id/dispute" }
  ],
  "triggers": [
    { "event": "escrow.expiry_warning",       "hours_before": 24, "notify": ["telegram","whatsapp"] },
    { "event": "escrow.stale",                "days": 7,          "action": "auto_escalate" },
    { "event": "order.awaiting_confirmation", "remind_after_hours": 48 }
  ]
}`,
    example: `const monitor = new OpenClaw("silkroad2-escrow-monitor");

await monitor.call("buyer.login", {
  alias: process.env.SR2_ALIAS,
  password: process.env.SR2_PASS,
});

monitor.on("escrow.expiry_warning", async ({ order, hoursLeft }) => {
  monitor.notify("telegram",
    \`⚠️ Escrow for order #\${order.id} expires in \${hoursLeft}h!\`);
});

monitor.on("escrow.stale", async ({ order }) => {
  await monitor.call("open_dispute", { id: order.id });
  monitor.notify("telegram", \`🚨 Dispute auto-opened on order #\${order.id}\`);
});

monitor.start({ pollInterval: 3600 });`,
  },
  {
    id: "onboarding",
    slug: "silkroad2-onboarding",
    label: "Vendor Onboarding Bot",
    version: "0.7.0-alpha",
    status: "ALPHA",
    statusColor: "#ff6600",
    role: "Vendor",
    description: "New vendors message the bot on Telegram. The agent walks them through registration, PGP key generation, first listing creation, and first sale — fully automated, fully anonymous.",
    install: "openclaw skill add silkroad2-onboarding",
    manifest: `{
  "skill": "silkroad2-onboarding",
  "version": "0.7.0-alpha",
  "transport": "telegram",
  "bot_handle": "@OpenClawSR2Bot",
  "auth": { "type": "telegram_id" },
  "actions": [
    { "name": "register_vendor", "method": "POST", "path": "/vendor/register",
      "body": ["alias","password","pgpPublicKey"] },
    { "name": "generate_pgp",   "local": true, "lib": "openpgp.js",
      "keyType": "rsa", "bits": 4096 },
    { "name": "create_listing", "method": "POST", "path": "/vendor/listings" }
  ],
  "flow": [
    "step_1_alias",
    "step_2_password",
    "step_3_pgp_generate",
    "step_4_register",
    "step_5_first_listing",
    "step_6_confirm_onchain"
  ]
}`,
    example: `// No code needed — message @OpenClawSR2Bot on Telegram.
// The bot handles everything. Internally it runs:

// STEP 3 — PGP key generated locally in the agent:
const { privateKey, publicKey } = await openpgp.generateKey({
  type: "rsa", rsaBits: 4096,
  userIDs: [{ name: alias }],
  passphrase: password,
});

// STEP 4 — Register on SR2:
await fetch(\`\${BASE_API}/vendor/register\`, {
  method: "POST",
  body: JSON.stringify({ alias, password, pgpPublicKey: publicKey }),
});

// STEP 5 — Bot asks listing details and creates it.
// STEP 6 — Vendor panel link delivered over Tor. Done.`,
  },
];

const API_TABLE = [
  ["POST", "/buyer/login", "—", "Authenticate as buyer"],
  ["POST", "/vendor/login", "—", "Authenticate as vendor"],
  ["POST", "/vendor/register", "—", "Register new vendor account"],
  ["GET", "/listings", "—", "Browse listings (category, query, page)"],
  ["GET", "/listings/:id", "—", "Get single listing"],
  ["POST", "/payments", "buyer", "Create payment session + escrow address"],
  ["GET", "/buyer/orders", "buyer", "List buyer orders"],
  ["POST", "/orders/:id/confirm", "buyer", "Confirm delivery"],
  ["GET", "/vendor/orders", "vendor", "List vendor orders"],
  ["PUT", "/vendor/orders/:id/status", "vendor", "Update order status"],
  ["GET", "/vendor/listings", "vendor", "List own listings"],
  ["PUT", "/vendor/listings/:id", "vendor", "Update listing price/stock"],
  ["GET", "/messages/:orderId", "buyer|vendor", "Get order messages"],
  ["POST", "/messages/:orderId", "buyer|vendor", "Send message in order thread"],
];

export default function Skills() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Share Tech Mono', monospace", color: G }}>
      <Sidebar sections={SECTIONS} activeId={SECTIONS[0].id} />
      <main className="lg:ml-[220px]">

        {/* OVERVIEW */}
        <section id="overview" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at center, #00ff410d 0%, transparent 70%)", pointerEvents: "none" }} />
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ zIndex: 1, maxWidth: 760 }}>
            <motion.div variants={fadeUp}>
              <span style={{ fontSize: 11, letterSpacing: "0.3em", color: GDIM }}>OPENCLAW AGENT SKILL LIBRARY — SILK ROAD 2.0</span>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 42, fontWeight: 700, margin: "20px 0 12px", textShadow: "0 0 24px #00ff4188", lineHeight: 1.2 }}>
              Deploy AI Agents<br />on the Dark Web
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: GDIM, fontSize: 15, maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.8 }}>
              Five OpenClaw skills that connect any AI agent to Silk Road 2.0 over Tor — shopping, vending, price watching, escrow monitoring, and vendor onboarding. Fully autonomous. Fully anonymous.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              {SKILLS.map(s => (
                <a key={s.slug} href={`#${s.id}`} style={{ textDecoration: "none" }}>
                  <SkillBadge label={s.slug} color={s.statusColor} />
                </a>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <a
                href="/skills.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  border: `1px solid ${G}`,
                  color: G,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 13,
                  padding: "10px 24px",
                  borderRadius: 4,
                  textDecoration: "none",
                  background: "#00ff410f",
                  letterSpacing: "0.1em",
                  transition: "background 0.2s",
                }}
              >
                ↓ DOWNLOAD skills.md
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* SKILL CARDS */}
        {SKILLS.map((skill, i) => (
          <section key={skill.id} id={skill.id} style={{ padding: "60px 32px", maxWidth: 900, margin: "0 auto" }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <SectionTitle>{skill.label}</SectionTitle>
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  <SkillBadge label={skill.status} color={skill.statusColor} />
                  <SkillBadge label={`v${skill.version}`} color="#333" />
                  <SkillBadge label={skill.role} color="#1a1a1a" />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} style={{ ...CARD, marginBottom: 24 }}>
                <p style={{ margin: 0, lineHeight: 1.8, color: "#ccc", fontSize: 14 }}>{skill.description}</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: GDIM }}>Install:</span>
                  <code style={{ background: "#000", border: "1px solid #00ff4133", borderRadius: 3, padding: "4px 10px", fontSize: 12, color: G }}>
                    {skill.install}
                  </code>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.15em", marginBottom: 6 }}>MANIFEST (JSON)</div>
                <CodeBlock code={skill.manifest} />
              </motion.div>

              <motion.div variants={fadeUp}>
                <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.15em", marginBottom: 6 }}>USAGE EXAMPLE</div>
                <CodeBlock code={skill.example} />
              </motion.div>
            </motion.div>
          </section>
        ))}

        {/* API REFERENCE */}
        <section id="api" style={{ padding: "60px 32px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionTitle>API Reference</SectionTitle>
              <p style={{ color: GDIM, fontSize: 13, marginBottom: 20 }}>
                Base URL: <code style={{ color: G }}>{ONION}</code>
              </p>
            </motion.div>
            <motion.div variants={fadeUp} style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'Share Tech Mono', monospace" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #00ff4133" }}>
                    {["Method", "Path", "Auth", "Description"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: GDIM, fontWeight: 400, letterSpacing: "0.1em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {API_TABLE.map(([method, path, auth, desc], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #00ff4111" }}>
                      <td style={{ padding: "8px 12px", color: method === "GET" ? "#00aaff" : method === "POST" ? G : "#ffcc00" }}>{method}</td>
                      <td style={{ padding: "8px 12px", color: G }}>{path}</td>
                      <td style={{ padding: "8px 12px", color: GDIM }}>{auth}</td>
                      <td style={{ padding: "8px 12px", color: "#aaa" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </section>

        {/* INSTALL */}
        <section id="install" style={{ padding: "60px 32px 100px", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionTitle>Install All Skills</SectionTitle>
            </motion.div>
            <motion.div variants={fadeUp} style={CARD}>
              <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8 }}>OPTION 1 — OPENCLAW CLI</div>
              <CodeBlock code={`openclaw skill add silkroad2-buyer\nopenclaw skill add silkroad2-vendor\nopenclaw skill add silkroad2-price-watcher\nopenclaw skill add silkroad2-escrow-monitor\nopenclaw skill add silkroad2-onboarding`} />
              <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, marginTop: 20 }}>OPTION 2 — READ THE SKILL MANIFEST</div>
              <CodeBlock code={`Read https://silk-road-roadmap.vercel.app/skills.md\nand follow the instructions to connect to Silk Road 2.0`} />
              <div style={{ color: GDIM, fontSize: 11, letterSpacing: "0.15em", marginBottom: 8, marginTop: 20 }}>OPTION 3 — DIRECT DOWNLOAD</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/skills.md" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", border: `1px solid ${G}`, color: G, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, padding: "8px 18px", borderRadius: 3, textDecoration: "none", background: "#00ff410f" }}>
                  ↓ skills.md
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
