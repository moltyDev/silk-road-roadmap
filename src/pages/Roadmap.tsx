import { motion } from "framer-motion";
import { 
  Download, Palette, Shield, Box, History, RefreshCw, Leaf, 
  Terminal, Lock, EyeOff, Coins, ArrowRight, ShieldCheck, 
  Package, Unlock, CheckCircle2, AlertTriangle
} from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { Sidebar } from "@/components/Sidebar";
import { TerminalWindow } from "@/components/TerminalWindow";
import { Disclaimer } from "@/components/Disclaimer";

const SECTIONS = [
  { id: "cover", label: "Initialization" },
  { id: "vision", label: "Vision & Positioning" },
  { id: "history", label: "Historical Context" },
  { id: "branding", label: "Branding Identity" },
  { id: "access", label: "Access Roadmap" },
  { id: "payment", label: "Payment System" },
  { id: "development", label: "Dev Roadmap" },
  { id: "guardrails", label: "Ethical Guardrails" },
  { id: "closing", label: "System Shutdown" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Roadmap() {
  const activeId = useScrollSpy(SECTIONS.map(s => s.id), 300);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar sections={SECTIONS} activeId={activeId} />
      
      <main className="flex-1 lg:ml-64 relative">
        
        {/* SECTION 0: COVER */}
        <section id="cover" className="min-h-screen flex flex-col justify-center items-center p-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src={`${import.meta.env.BASE_URL}images/dark-grid-bg.png`} 
              alt="Grid Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          </div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="z-10 w-full max-w-4xl text-center flex flex-col items-center"
          >
            <motion.img 
              variants={fadeInUp}
              src={`${import.meta.env.BASE_URL}images/camel-cthulhu-logo.png`}
              alt="Silk Road 2.0 Camel Cthulhu Logo"
              className="w-64 md:w-96 mb-8 drop-shadow-[0_0_30px_rgba(0,204,102,0.6)]"
            />
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-accent text-glow mb-4">
              Silk Road <span className="text-white">2.0</span>
            </motion.h1>
            
            <motion.h2 variants={fadeInUp} className="text-xl md:text-3xl text-gray-300 mb-6 border-b border-primary/50 pb-6 inline-block">
              This Hidden Site Has Risen Again – <span className="text-accent font-bold">Legally</span>
              <span className="inline-block w-3 h-8 bg-accent ml-2 align-middle animate-blink"></span>
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 text-sm font-mono text-muted-foreground mb-12">
              <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded text-accent">Privacy</span>
              <span className="px-3 py-1 bg-primary/20 border border-primary/50 rounded text-accent">Anonymity</span>
              <span className="px-3 py-1 bg-primary/20 border border-accent/50 rounded text-accent box-glow-accent">$CTHULHU Payments</span>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-gray-500 font-mono text-sm max-w-lg">
              v1.0 — March 2026
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 1: VISION */}
        <section id="vision" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-6xl mx-auto w-full"
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 flex items-center gap-4">
                <Terminal className="w-10 h-10 text-accent" />
                Vision & Positioning
              </h2>
              <blockquote className="border-l-4 border-accent pl-6 py-2 text-2xl text-gray-300 font-mono bg-primary/10 rounded-r-lg">
                "This Hidden Site Has Risen Again – For Legitimate Trade"
              </blockquote>
              <p className="mt-8 text-lg text-gray-400 max-w-3xl leading-relaxed">
                A Tor-only .onion marketplace that resurrects the iconic, nostalgic look and feel of the classic darknet markets of 2013–2014, but enforcing a strict, <strong className="text-accent">100% legal product policy</strong>.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Download, title: "Digital Downloads", desc: "E-books, privacy software licenses, open-source auditing tools." },
                { icon: Palette, title: "Art & Collectibles", desc: "Digital prints, customizable designs, independent artist wares." },
                { icon: Shield, title: "Privacy Services", desc: "VPN subscriptions, encrypted email aliases, secure hosting." },
                { icon: Box, title: "Physical Goods", desc: "Merch, books, artisanal items shipped normally with proper customs declarations." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-card border border-primary/30 rounded-xl hover:border-accent hover:box-glow transition-all group">
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            <Disclaimer />
          </motion.div>
        </section>

        {/* SECTION 2: HISTORY */}
        <section id="history" className="min-h-screen py-24 px-6 md:px-12 bg-primary/5 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-6xl mx-auto w-full"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-16">
              Historical Inspiration
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/30 -translate-y-1/2 z-0"></div>

              <motion.div variants={fadeInUp} className="relative z-10 bg-black border border-primary/30 p-8 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                <History className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl text-white mb-2">Original Era</h3>
                <p className="text-accent font-mono text-sm mb-4">2011 – 2013</p>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• Tor Hidden Service</li>
                  <li>• Bitcoin exclusivity</li>
                  <li>• Escrow system</li>
                  <li>• Vendor rating mechanics</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative z-10 bg-black border border-primary/50 p-8 rounded-xl box-glow opacity-80 hover:opacity-100 transition-opacity">
                <RefreshCw className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl text-white mb-2">Silk Road 2.0</h3>
                <p className="text-accent font-mono text-sm mb-4">2013 – 2014</p>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>• "Risen again" branding</li>
                  <li>• Green camel logo</li>
                  <li>• Improved interface</li>
                  <li>• Multi-admin claims</li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative z-10 bg-black border-2 border-accent p-8 rounded-xl box-glow-accent">
                <Leaf className="w-12 h-12 text-accent mb-6 drop-shadow-[0_0_10px_rgba(0,204,102,0.8)]" />
                <h3 className="text-2xl text-white mb-2">The Revival</h3>
                <p className="text-accent font-mono text-sm mb-4">2026</p>
                <ul className="text-gray-300 space-y-2 text-sm font-medium">
                  <li>• Legal products ONLY</li>
                  <li>• $CTHULHU meme token integration</li>
                  <li>• Solana/Monero/BTC support</li>
                  <li>• Modern backend, retro frontend</li>
                </ul>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="mt-16 p-6 border border-accent bg-accent/10 rounded-xl text-center">
              <p className="text-lg font-mono text-accent">
                <Lock className="inline-block w-5 h-5 mr-2 -mt-1" />
                This concept copies ONLY the user experience and technical architecture – never the product categories or illegal intent.
              </p>
            </motion.div>
            
            <Disclaimer />
          </motion.div>
        </section>

        {/* SECTION 3: BRANDING */}
        <section id="branding" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center border-t border-primary/20 relative overflow-hidden">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-6xl mx-auto w-full relative z-10"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-16">
              Branding & Visual Identity
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div variants={fadeInUp} className="space-y-12">
                <div>
                  <h3 className="text-xl font-mono text-muted-foreground mb-4">Color Palette</h3>
                  <div className="flex rounded-lg overflow-hidden h-24 border border-primary/30 w-full">
                    <div className="flex-1 bg-[#0a0a0a] flex items-end p-2 text-xs font-mono text-gray-500">#0a0a0a</div>
                    <div className="flex-1 bg-[#006400] flex items-end p-2 text-xs font-mono text-white/70">#006400</div>
                    <div className="flex-1 bg-[#00CC66] flex items-end p-2 text-xs font-mono text-black font-bold">#00CC66</div>
                    <div className="flex-1 bg-[#FFFFFF] flex items-end p-2 text-xs font-mono text-black">#FFFFFF</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-mono text-muted-foreground mb-4">Typography</h3>
                  <div className="space-y-4 border border-primary/30 p-6 rounded-xl bg-card">
                    <div>
                      <span className="text-xs text-accent">Header Font (Fira Code)</span>
                      <h4 className="text-3xl mt-1">Wake the Ancient Markets</h4>
                    </div>
                    <div className="pt-4 border-t border-primary/20">
                      <span className="text-xs text-accent">Body Font (Inter)</span>
                      <p className="text-lg text-gray-400 mt-1">Privacy without prohibition. Trade freely and legally in the deep web.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-mono text-muted-foreground mb-4">Slogans</h3>
                  <div className="space-y-3">
                    {["Wake the Ancient Markets – Legally", "Privacy Without Prohibition", "$CTHULHU Powered Anonymity"].map((s, i) => (
                      <div key={i} className="p-4 bg-primary/10 border-l-2 border-accent font-mono text-white">
                        &gt; {s}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-2xl border-2 border-accent p-2 box-glow-accent overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="font-mono text-accent font-bold text-xl drop-shadow-md">GUARDIAN OF PRIVACY</span>
                  </div>
                  <img 
                    src={`${import.meta.env.BASE_URL}images/cthulhu-mascot.png`}
                    alt="Official Mascot - Green Cthulhu Plush"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent"></div>
                </div>
                <p className="mt-6 font-mono text-accent text-center tracking-widest">
                  OFFICIAL MASCOT <br/> <span className="text-sm text-gray-400">The Friendly Guardian of the Deep Web</span>
                </p>
              </motion.div>
            </div>
            
            <Disclaimer />
          </motion.div>
        </section>

        {/* SECTION 4: ACCESS */}
        <section id="access" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-4xl mx-auto w-full"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-12 flex items-center gap-4">
              <EyeOff className="w-10 h-10 text-accent" />
              How To Access
            </motion.h2>

            <div className="space-y-8 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-primary/30 z-0"></div>

              {[
                {
                  step: 1,
                  title: "Download Tor Browser",
                  content: (
                    <TerminalWindow title="user@localhost:~">
                      $ wget https://www.torproject.org/dist/torbrowser/latest/tor-browser-linux64.tar.xz<br/>
                      $ tar -xvf tor-browser-linux64.tar.xz<br/>
                      <span className="text-green-400"># Install & connect (green onion icon appears)</span>
                    </TerminalWindow>
                  )
                },
                {
                  step: 2,
                  title: "Enter the .onion address",
                  content: (
                    <div className="p-4 bg-black border border-primary/50 rounded flex items-center gap-4">
                      <Lock className="text-accent" />
                      <span className="font-mono text-white break-all">http://silkroad2cthulhu-v3.onion</span>
                    </div>
                  )
                },
                {
                  step: 3,
                  title: "Register Anonymously",
                  content: <p className="text-gray-400 font-mono text-sm">Username + strong passphrase. No email or phone ever asked. Enable 2FA with authenticator app.</p>
                },
                {
                  step: 4,
                  title: "Fund Wallet",
                  content: <p className="text-gray-400 font-mono text-sm">Deposit $CTHULHU (Solana via Phantom), BTC, ETH, USDT, Monero. Site generates unique deposit QR/address per transaction.</p>
                },
                {
                  step: 5,
                  title: "Browse & Buy Legally",
                  content: (
                    <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-accent">
                      <span className="bg-primary/20 px-2 py-1 rounded">Categories</span> <ArrowRight className="w-4 h-4 text-gray-500" />
                      <span className="bg-primary/20 px-2 py-1 rounded">Cart</span> <ArrowRight className="w-4 h-4 text-gray-500" />
                      <span className="bg-primary/20 px-2 py-1 rounded">Escrow</span> <ArrowRight className="w-4 h-4 text-gray-500" />
                      <span className="bg-primary/20 px-2 py-1 rounded text-white">Release Funds</span>
                    </div>
                  )
                }
              ].map((item) => (
                <motion.div key={item.step} variants={fadeInUp} className="relative z-10 flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-accent flex items-center justify-center font-bold text-accent shrink-0 box-glow-accent">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl text-white mb-4">{item.title}</h3>
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-16 p-6 border-l-4 border-red-500 bg-red-950/20 rounded-r-xl">
              <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Security Reminders
              </h4>
              <ul className="text-red-200/70 font-mono text-sm space-y-2 list-disc pl-5">
                <li>Use Tor only – never clear web browsers.</li>
                <li>Generate fresh wallet addresses per transaction.</li>
                <li>Make a small test purchase first.</li>
                <li>Never share real personal info. Use PGP for physical drops.</li>
              </ul>
            </motion.div>

            <Disclaimer />
          </motion.div>
        </section>

        {/* SECTION 5: PAYMENT */}
        <section id="payment" className="min-h-screen py-24 px-6 md:px-12 bg-primary/5 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-6xl mx-auto w-full"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-16 flex items-center gap-4">
              <Coins className="w-10 h-10 text-accent" />
              Payment & Escrow
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Featured Token */}
              <motion.div variants={fadeInUp} className="lg:col-span-2 bg-gradient-to-br from-primary/40 to-black border-2 border-accent rounded-xl p-8 box-glow-accent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-bold text-accent mb-2">$CTHULHU</h3>
                <p className="font-mono text-sm text-green-300 mb-4">Solana Meme Token • Native Currency</p>
                <p className="text-gray-300 mb-6">Fastest, cheapest settlement. Direct theme synergy with the marketplace mascot. Exclusive discounts for buyers using $CTHULHU.</p>
                <div className="text-xs font-mono text-muted-foreground p-3 bg-black/50 border border-primary/30 rounded break-all">
                  CA: 6cXMtoRynUPBsqUkVCfStRgUL9mPQKmQ8wurBagSpump
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-card border border-primary/30 rounded-xl p-6 flex flex-col justify-center items-center text-center hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">₿</div>
                <h3 className="text-lg text-white mb-2">Bitcoin</h3>
                <p className="text-sm text-gray-500">The classic standard</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-card border border-primary/30 rounded-xl p-6 flex flex-col justify-center items-center text-center hover:border-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xl mb-4">M</div>
                <h3 className="text-lg text-white mb-2">Monero</h3>
                <p className="text-sm text-gray-500">Maximum privacy</p>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="p-8 border border-primary/50 bg-black rounded-xl">
              <h3 className="text-xl font-mono text-accent mb-8 text-center">Multi-Sig Escrow Flow</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
                <div className="flex flex-col items-center text-center w-32">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center mb-3">
                    <Coins className="text-white" />
                  </div>
                  <span className="text-sm font-mono">Buyer Sends</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                <ArrowRight className="w-6 h-6 text-accent rotate-90 md:hidden" />
                
                <div className="flex flex-col items-center text-center w-32">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent flex items-center justify-center mb-3 box-glow-accent">
                    <ShieldCheck className="text-accent" />
                  </div>
                  <span className="text-sm font-mono text-accent">Smart Escrow</span>
                </div>
                
                <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                <ArrowRight className="w-6 h-6 text-accent rotate-90 md:hidden" />

                <div className="flex flex-col items-center text-center w-32">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center mb-3">
                    <Package className="text-white" />
                  </div>
                  <span className="text-sm font-mono">Seller Ships</span>
                </div>

                <ArrowRight className="w-6 h-6 text-accent hidden md:block" />
                <ArrowRight className="w-6 h-6 text-accent rotate-90 md:hidden" />

                <div className="flex flex-col items-center text-center w-32">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center mb-3 text-green-400">
                    <Unlock />
                  </div>
                  <span className="text-sm font-mono text-green-400">Funds Released</span>
                </div>
              </div>
            </motion.div>

            <Disclaimer />
          </motion.div>
        </section>

        {/* SECTION 6: ROADMAP */}
        <section id="development" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-4xl mx-auto w-full"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-16">
              Development Roadmap
            </motion.h2>

            <div className="relative border-l-2 border-primary/30 ml-4 md:ml-6 space-y-12">
              
              {/* Phase 0 - ACTIVE */}
              <motion.div variants={fadeInUp} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-accent box-glow-accent animate-pulse"></div>
                <div className="absolute -left-[15px] top-0 w-7 h-7 rounded-full border border-accent animate-ping"></div>
                
                <div className="bg-primary/10 border border-accent/50 p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent text-black font-bold font-mono text-xs px-3 py-1 rounded-bl-lg">CURRENT</div>
                  <h3 className="text-2xl text-accent mb-2">Phase 0: Research & Planning</h3>
                  <p className="text-muted-foreground font-mono text-sm mb-4">Now – Q2 2026</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Study Tor Hidden Service v3 setup</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Define strict legal product policy</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Design UI mimicking 2013 style + Cthulhu elements</li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 1 */}
              <motion.div variants={fadeInUp} className="relative pl-8 md:pl-12 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-2 border-background"></div>
                
                <div className="bg-card border border-primary/30 p-6 rounded-xl">
                  <h3 className="text-xl text-white mb-2">Phase 1: Prototype</h3>
                  <p className="text-muted-foreground font-mono text-sm mb-4">Q3 2026</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Build backend (Python/Flask + PostgreSQL + Tor proxy)</li>
                    <li>• Implement anonymous registration & escrow logic</li>
                    <li>• Integrate $CTHULHU + crypto payments</li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 2 */}
              <motion.div variants={fadeInUp} className="relative pl-8 md:pl-12 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-2 border-background"></div>
                
                <div className="bg-card border border-primary/30 p-6 rounded-xl">
                  <h3 className="text-xl text-white mb-2">Phase 2: Beta Launch</h3>
                  <p className="text-muted-foreground font-mono text-sm mb-4">Q4 2026</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Private .onion testing with invited legal sellers</li>
                    <li>• Focus: digital goods only at first</li>
                  </ul>
                </div>
              </motion.div>

              {/* Phase 3 & 4 */}
              <motion.div variants={fadeInUp} className="relative pl-8 md:pl-12 opacity-60 hover:opacity-100 transition-opacity">
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-2 border-background"></div>
                
                <div className="bg-card border border-primary/30 p-6 rounded-xl">
                  <h3 className="text-xl text-white mb-2">Phase 3 & 4: Growth & Maturity</h3>
                  <p className="text-muted-foreground font-mono text-sm mb-4">2027+</p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• Publish .onion link via privacy forums / X / Telegram</li>
                    <li>• Add Monero auto-swap & vendor verification</li>
                    <li>• Community governance votes</li>
                  </ul>
                </div>
              </motion.div>

            </div>
            
            <Disclaimer className="mt-16" />
          </motion.div>
        </section>

        {/* SECTION 7: GUARDRAILS */}
        <section id="guardrails" className="min-h-screen py-24 px-6 md:px-12 bg-primary/5 flex flex-col justify-center border-t border-primary/20">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-5xl mx-auto w-full"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl mb-12 flex items-center gap-4 text-accent">
              <Shield className="w-10 h-10" />
              Legal & Ethical Guardrails
            </motion.h2>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "100% compliant goods only – auto + manual moderation",
                "No logs of user activity beyond necessary escrow data",
                "Public legal disclaimer explicitly required on every page",
                "Cooperate with law enforcement if subpoenaed (standard practice)",
                "Goal: Prove anonymous commerce can be ethical and legal"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-black border border-primary/30 rounded-lg hover:border-accent transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TerminalWindow title="legal_disclaimer.txt" className="border-red-500/50">
                <span className="text-accent">POLICY:</span> Silk Road 2.0 enforces a strict legal-only product policy across all categories. 
                <br/><br/>
                We do not condone, endorse, or facilitate the sale of illicit goods, services, or materials. All vendors are subject to verification. All goods must comply with local and international law. Privacy-preserving technologies like Tor and cryptocurrency are tools for freedom — not crime.
                <br/><br/>
                <span className="text-accent animate-pulse">End of file.</span>
              </TerminalWindow>
            </motion.div>

          </motion.div>
        </section>

        {/* SECTION 8: CLOSING */}
        <section id="closing" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center items-center text-center border-t border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-primary/10"></div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="max-w-4xl mx-auto w-full z-10 flex flex-col items-center"
          >
            <motion.img 
              variants={fadeInUp}
              src={`${import.meta.env.BASE_URL}images/cthulhu-mascot.png`}
              alt="Cthulhu Mascot Final"
              className="w-48 h-48 rounded-full border-4 border-accent mb-8 box-glow-accent object-cover"
            />

            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white mb-6">
              Silk Road 2.0 <br/>
              <span className="text-accent text-3xl md:text-5xl">2026 Reimagined</span>
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-2xl text-gray-300 font-mono mb-8 italic">
              "Wake the depths – legally."
            </motion.p>

            <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
              A privacy-first marketplace that revives the look & feel of 2013 darknet UX – but sells only lawful goods, accepts $CTHULHU, and is guarded by a cute green Cthulhu.
            </motion.p>

            <motion.div variants={fadeInUp} className="inline-block border border-accent/50 bg-accent/10 px-8 py-4 rounded-full backdrop-blur-md">
              <span className="text-accent font-mono tracking-widest uppercase box-glow text-lg font-bold">
                This Hidden Site Has Risen Again
              </span>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-24 text-xs text-muted-foreground font-mono flex flex-col gap-2">
              <p>No Illegal Goods | Privacy First | $CTHULHU Powered</p>
              <p>© 2026 Silk Road 2.0</p>
            </motion.div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
