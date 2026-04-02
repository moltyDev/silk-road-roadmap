# Silk Road 2.0 — OpenClaw Skills

**ClawHub Registry:** `silkroad2-*`  
**Base URL:** `http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api`  
**Transport:** HTTPS over Tor (v3 hidden service)  
**Payment Token:** $CTHU — `6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump`  
**Payment Protocol:** x402  
**Fallback Payment:** SOL (Solana mainnet)  
**Auth:** Session cookie (`POST /buyer/login` or `POST /vendor/login`)

---

## Skills Index

| Skill | Slug | Version | Status | Role |
|---|---|---|---|---|
| SR2 Shopping Agent | `silkroad2-buyer` | 1.0.0 | STABLE | Buyer |
| SR2 Vendor Agent | `silkroad2-vendor` | 1.0.0 | STABLE | Vendor |
| CTHU Price Watcher | `silkroad2-price-watcher` | 0.9.0-beta | BETA | Trader |
| Escrow Monitor | `silkroad2-escrow-monitor` | 0.8.0-beta | BETA | Buyer/Vendor |
| Vendor Onboarding Bot | `silkroad2-onboarding` | 0.7.0-alpha | ALPHA | Vendor |

---

## Skill: `silkroad2-buyer`

**Install:** `openclaw skills add silkroad2-buyer`  
**Description:** Browse listings, create orders, pay in $CTHU or SOL via escrow, confirm delivery. Sends WhatsApp/Telegram notifications on order events.

### Manifest

```json
{
  "skill": "silkroad2-buyer",
  "version": "1.0.0",
  "transport": "https+tor",
  "base_url": "http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api",
  "auth": {
    "type": "session_cookie",
    "endpoint": "/buyer/login",
    "fields": ["alias", "password"]
  },
  "payment": {
    "token": "CTHU",
    "contract": "6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump",
    "protocol": "x402",
    "fallback": "SOL"
  },
  "actions": [
    { "name": "browse_listings",     "method": "GET",  "path": "/listings",             "params": ["category", "query", "minPrice", "maxPrice", "page"] },
    { "name": "get_listing",         "method": "GET",  "path": "/listings/:id" },
    { "name": "create_order",        "method": "POST", "path": "/orders",               "body": ["listingId", "quantity"] },
    { "name": "pay_order",           "method": "POST", "path": "/payments",             "body": ["orderId", "method", "txSignature"] },
    { "name": "get_orders",          "method": "GET",  "path": "/buyer/orders",         "params": ["status", "page"] },
    { "name": "confirm_delivery",    "method": "POST", "path": "/orders/:id/confirm" },
    { "name": "send_message",        "method": "POST", "path": "/messages/:orderId",    "body": ["content"] },
    { "name": "get_messages",        "method": "GET",  "path": "/messages/:orderId" }
  ],
  "triggers": [
    { "event": "order.paid",        "notify": ["whatsapp", "telegram"] },
    { "event": "order.shipped",     "notify": ["whatsapp", "telegram"] },
    { "event": "order.completed",   "notify": ["whatsapp", "telegram"] },
    { "event": "message.received",  "notify": ["telegram"] }
  ]
}
```

### Usage Example

```javascript
const agent = new OpenClaw("silkroad2-buyer");

await agent.call("buyer.login", {
  alias: process.env.SR2_ALIAS,
  password: process.env.SR2_PASS,
});

const listings = await agent.call("browse_listings", {
  category: "Digital Goods",
  maxPrice: 500,
});

const order = await agent.call("create_order", {
  listingId: listings[0].id,
  quantity: 1,
});

const tx = await agent.pay({
  to: order.escrowAddress,
  amount: order.amountCthu,
  token: "CTHU",
});

await agent.call("pay_order", {
  orderId: order.id,
  method: "cthu",
  txSignature: tx.signature,
});

agent.on("order.shipped", ({ order }) => {
  agent.notify("whatsapp", `📦 Order #${order.id} shipped!`);
});
```

---

## Skill: `silkroad2-vendor`

**Install:** `openclaw skills add silkroad2-vendor`  
**Description:** Monitor incoming orders 24/7, auto-respond to buyer messages, flag disputes, update order status. Telegram alerts on every payment and dispute event.

### Manifest

```json
{
  "skill": "silkroad2-vendor",
  "version": "1.0.0",
  "transport": "https+tor",
  "base_url": "http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api",
  "auth": {
    "type": "session_cookie",
    "endpoint": "/vendor/login",
    "fields": ["alias", "password"]
  },
  "payment": {
    "receive": ["CTHU", "SOL"],
    "escrow": "Ed25519",
    "auto_sweep": true
  },
  "actions": [
    { "name": "get_orders",          "method": "GET",  "path": "/vendor/orders",           "params": ["status", "page"] },
    { "name": "update_order_status", "method": "PUT",  "path": "/vendor/orders/:id/status","body": ["status", "trackingInfo"] },
    { "name": "reply_message",       "method": "POST", "path": "/messages/:orderId",        "body": ["content"] },
    { "name": "get_messages",        "method": "GET",  "path": "/messages/:orderId" },
    { "name": "get_escrow_balance",  "method": "GET",  "path": "/vendor/escrow" },
    { "name": "get_listings",        "method": "GET",  "path": "/vendor/listings" },
    { "name": "update_listing",      "method": "PUT",  "path": "/vendor/listings/:id",     "body": ["price", "stock", "description"] }
  ],
  "triggers": [
    { "event": "order.new",          "notify": ["telegram"],            "auto_reply": true },
    { "event": "payment.received",   "notify": ["telegram", "webhook"], "auto_reply": true },
    { "event": "dispute.opened",     "notify": ["telegram"],            "escalate_after_hours": 48 },
    { "event": "message.received",   "notify": ["telegram"],            "auto_reply": true }
  ],
  "auto_reply_templates": {
    "order.new":        "Your order has been received. Processing time: 24-48 hours.",
    "payment.received": "Payment confirmed on-chain. Your order is now being prepared.",
    "dispute.opened":   "We have received your dispute. Our team will respond within 48 hours."
  }
}
```

### Usage Example

```javascript
const agent = new OpenClaw("silkroad2-vendor");

await agent.call("vendor.login", {
  alias: process.env.SR2_VENDOR_ALIAS,
  password: process.env.SR2_VENDOR_PASS,
});

agent.on("order.new", async ({ order }) => {
  await agent.call("reply_message", {
    orderId: order.id,
    content: "Order received. Processing in 24h.",
  });
  agent.notify("telegram", `🛒 New order #${order.id}: ${order.listingTitle}`);
});

agent.on("payment.received", async ({ order, amount, token }) => {
  agent.notify("telegram", `💰 ${amount} ${token} hit escrow — order #${order.id}`);
  await agent.call("update_order_status", { id: order.id, status: "processing" });
});

agent.on("dispute.opened", async ({ order }) => {
  agent.notify("telegram", `⚠️ Dispute on order #${order.id}`);
  agent.scheduleEscalation(order.id, 48);
});

agent.start({ pollInterval: 30 });
```

---

## Skill: `silkroad2-price-watcher`

**Install:** `openclaw skills add silkroad2-price-watcher`  
**Description:** Monitor $CTHU price on-chain via QuickNode RPC. Auto-buy on dip via Jupiter, alert on listing price drops.

### Manifest

```json
{
  "skill": "silkroad2-price-watcher",
  "version": "0.9.0-beta",
  "transport": "https",
  "rpc": "https://spring-red-patina.solana-mainnet.quiknode.pro/",
  "dex": "Jupiter v6",
  "token": {
    "symbol": "CTHU",
    "contract": "6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump",
    "decimals": 6
  },
  "actions": [
    { "name": "get_cthu_price",    "source": "Jupiter", "url": "https://price.jup.ag/v4/price?ids=CTHU" },
    { "name": "get_token_balance", "rpc": "getTokenAccountsByOwner" },
    { "name": "set_buy_trigger",   "params": ["priceFloor", "buyAmountUsdc", "wallet"] },
    { "name": "set_listing_alert", "params": ["listingId", "targetPrice", "notifyOn"] },
    { "name": "auto_swap",         "dex": "Jupiter", "params": ["fromToken", "toToken", "amount", "slippage"] }
  ],
  "triggers": [
    { "event": "price.below_floor",   "action": "auto_swap", "notify": ["telegram"] },
    { "event": "listing.price_drop",  "notify": ["telegram", "whatsapp"] },
    { "event": "price.above_target",  "notify": ["telegram"] }
  ]
}
```

### Usage Example

```javascript
const watcher = new OpenClaw("silkroad2-price-watcher");

watcher.setTrigger({
  event: "price.below_floor",
  priceFloor: 0.03,
  buyAmountUsdc: 100,
  wallet: process.env.SOLANA_WALLET_KEY,
  onTrigger: async ({ price }) => {
    watcher.notify("telegram", `🟢 CTHU at $${price} — auto-buying $100`);
    await watcher.call("auto_swap", {
      fromToken: "USDC", toToken: "CTHU", amount: 100, slippage: 1.0,
    });
  },
});

watcher.setListingAlert({
  listingId: 42,
  targetPrice: 200,
  notifyOn: "drop",
  onAlert: ({ listing, oldPrice, newPrice }) => {
    watcher.notify("whatsapp", `📉 "${listing.title}" dropped ${oldPrice}→${newPrice} CTHU`);
  },
});

watcher.start({ pollInterval: 60 });
```

---

## Skill: `silkroad2-escrow-monitor`

**Install:** `openclaw skills add silkroad2-escrow-monitor`  
**Description:** Track all open escrows. Delivery reminders, auto-escalate stale disputes, never miss an expiry window.

### Manifest

```json
{
  "skill": "silkroad2-escrow-monitor",
  "version": "0.8.0-beta",
  "transport": "https+tor",
  "base_url": "http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api",
  "auth": { "type": "session_cookie" },
  "actions": [
    { "name": "list_open_escrows",  "method": "GET",  "path": "/buyer/orders",      "params": ["status=escrow"] },
    { "name": "get_escrow_status",  "method": "GET",  "path": "/orders/:id" },
    { "name": "confirm_delivery",   "method": "POST", "path": "/orders/:id/confirm" },
    { "name": "open_dispute",       "method": "POST", "path": "/orders/:id/dispute" }
  ],
  "triggers": [
    { "event": "escrow.expiry_warning",        "hours_before": 24,  "notify": ["telegram", "whatsapp"] },
    { "event": "escrow.stale",                 "days": 7,           "action": "auto_escalate" },
    { "event": "order.awaiting_confirmation",  "remind_after_hours": 48 }
  ]
}
```

### Usage Example

```javascript
const monitor = new OpenClaw("silkroad2-escrow-monitor");

await monitor.call("buyer.login", {
  alias: process.env.SR2_ALIAS,
  password: process.env.SR2_PASS,
});

monitor.on("escrow.expiry_warning", async ({ order, hoursLeft }) => {
  monitor.notify("telegram", `⚠️ Escrow for order #${order.id} expires in ${hoursLeft}h!`);
});

monitor.on("order.awaiting_confirmation", async ({ order, daysSince }) => {
  if (daysSince >= 7) {
    await monitor.call("confirm_delivery", { id: order.id });
    monitor.notify("whatsapp", `✅ Order #${order.id} auto-confirmed after ${daysSince} days`);
  }
});

monitor.on("escrow.stale", async ({ order }) => {
  await monitor.call("open_dispute", { id: order.id });
  monitor.notify("telegram", `🚨 Dispute auto-opened on order #${order.id}`);
});

monitor.start({ pollInterval: 3600 });
```

---

## Skill: `silkroad2-onboarding`

**Install:** `openclaw skills add silkroad2-onboarding`  
**Description:** Telegram bot that walks new vendors through registration, PGP key generation, first listing, and first sale — fully automated, fully anonymous.

### Manifest

```json
{
  "skill": "silkroad2-onboarding",
  "version": "0.7.0-alpha",
  "transport": "telegram",
  "bot_handle": "@OpenClawSR2Bot",
  "auth": { "type": "telegram_id" },
  "actions": [
    { "name": "register_vendor", "method": "POST", "path": "/vendor/register",  "body": ["alias", "password", "pgpPublicKey"] },
    { "name": "generate_pgp",    "local": true,    "lib": "openpgp.js",         "keyType": "rsa", "bits": 4096 },
    { "name": "create_listing",  "method": "POST", "path": "/vendor/listings",  "body": ["title", "description", "price", "category", "stock"] },
    { "name": "verify_identity", "method": "POST", "path": "/vendor/verify",    "body": ["signedChallenge"] }
  ],
  "flow": [
    "step_1_alias",
    "step_2_password",
    "step_3_pgp_generate",
    "step_4_register",
    "step_5_first_listing",
    "step_6_confirm_onchain"
  ]
}
```

### Usage Example

```javascript
// No code needed — message @OpenClawSR2Bot on Telegram.
// The bot handles everything. Here is what runs internally:

// STEP 3 — PGP key generated locally in the agent:
const { privateKey, publicKey } = await openpgp.generateKey({
  type: "rsa", rsaBits: 4096,
  userIDs: [{ name: alias }],
  passphrase: password,
});

// STEP 4 — Account registered on SR2:
await fetch(`${BASE_API}/vendor/register`, {
  method: "POST",
  body: JSON.stringify({ alias, password, pgpPublicKey: publicKey }),
});

// STEP 5 — Bot asks for listing details and creates first listing.
// STEP 6 — Vendor panel link sent over Tor. Done.
```

---

## API Reference

All endpoints are relative to `http://3nijlkonhuldrobrbqbxkzcninebbyaik6n36qp7bvqr5y7vyru3meid.onion/api`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /buyer/login | — | Authenticate as buyer |
| POST | /vendor/login | — | Authenticate as vendor |
| GET | /listings | — | Browse listings (category, query, page) |
| GET | /listings/:id | — | Get single listing |
| POST | /orders | buyer | Create order |
| POST | /payments | buyer | Submit on-chain payment |
| GET | /buyer/orders | buyer | List buyer orders |
| POST | /orders/:id/confirm | buyer | Confirm delivery |
| GET | /vendor/orders | vendor | List vendor orders |
| PUT | /vendor/orders/:id/status | vendor | Update order status |
| GET | /messages/:orderId | buyer\|vendor | Get order messages |
| POST | /messages/:orderId | buyer\|vendor | Send message |

---

## x402 Payment Protocol

Agents attach a signed $CTHU payment to API calls using the x402 standard:

```javascript
// Handled automatically by the skill — shown for reference:
const payment = await agent.signPayment({
  token: "CTHU",
  amount: listing.priceCthu,
  to: escrowAddress,
  memo: `order-${orderId}`,
});
// Sent as: X-Payment: <base64-signed-transaction>
// API verifies on Solana mainnet before processing the request.
```

---

*Silk Road 2.0 — Unbanked. Untraceable. Unstoppable.*  
*CTHU: `6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump`*  
*Roadmap: https://silk-road-roadmap.vercel.app*
