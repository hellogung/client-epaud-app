import { Link } from "react-router";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Check, Star, Zap, Crown, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ColorKey = "cyan" | "orange" | "purple";

const colorStyles: Record<ColorKey, { bg: string; text: string }> = {
  cyan: { bg: "bg-epaud-cyan/20", text: "text-epaud-cyan" },
  orange: { bg: "bg-epaud-orange/20", text: "text-epaud-orange" },
  purple: { bg: "bg-epaud-purple/20", text: "text-epaud-purple" },
};

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  icon: LucideIcon;
  color: ColorKey;
  popular: boolean;
  features: string[];
  limitations: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Cocok untuk sekolah PAUD kecil yang baru memulai",
    price: "Gratis",
    period: "selamanya",
    icon: Star,
    color: "cyan",
    popular: false,
    features: ["Maksimal 30 siswa", "Manajemen data dasar", "Absensi digital", "1 admin user", "Email support"],
    limitations: ["Tanpa rapor digital", "Tanpa integrasi WhatsApp"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Untuk sekolah PAUD yang ingin pengalaman lengkap",
    price: "299K",
    period: "per bulan",
    icon: Zap,
    color: "orange",
    popular: true,
    features: ["Maksimal 100 siswa", "Semua fitur Starter", "Rapor digital", "Forum orang tua", "Integrasi WhatsApp", "3 admin users", "Priority support"],
    limitations: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solusi lengkap untuk yayasan multi-cabang",
    price: "699K",
    period: "per bulan",
    icon: Crown,
    color: "purple",
    popular: false,
    features: ["Siswa unlimited", "Semua fitur Professional", "PPDB Online", "Integrasi QRIS", "Multi-cabang", "Admin unlimited", "Dedicated support"],
    limitations: [],
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-epaud-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-epaud-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-epaud-yellow/10 border border-epaud-yellow/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-epaud-yellow" />
            <span className="text-sm font-medium text-epaud-yellow">Harga Terjangkau</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          >
            <span className="text-foreground">Pilih Paket yang </span>
            <span className="bg-gradient-to-r from-epaud-yellow to-epaud-orange bg-clip-text text-transparent">
              Tepat untuk Anda
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Mulai gratis, upgrade kapan saja. Tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const styles = colorStyles[plan.color];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-card rounded-2xl border ${
                  plan.popular ? "border-epaud-orange shadow-xl shadow-epaud-orange/10" : "border-border"
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-epaud-orange to-epaud-pink text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                      POPULER
                    </div>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${styles.bg} flex items-center justify-center`}>
                      <plan.icon className={`w-6 h-6 ${styles.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      {plan.price !== "Gratis" && <span className="text-lg text-muted-foreground">Rp</span>}
                      <span className={`text-4xl font-black ${
                        plan.popular ? "bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent" : "text-foreground"
                      }`}>
                        {plan.price}
                      </span>
                      {plan.price !== "Gratis" && <span className="text-muted-foreground">/{plan.period.split(" ")[0]}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                  </div>

                  <Link to="/register" className="block mb-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-epaud-orange to-epaud-pink hover:from-epaud-orange/90 hover:to-epaud-pink/90 text-white shadow-lg shadow-epaud-orange/30"
                            : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                        size="lg"
                      >
                        {plan.price === "Gratis" ? "Mulai Gratis" : "Pilih Paket"}
                      </Button>
                    </motion.div>
                  </Link>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Yang Anda dapatkan:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className={`w-4 h-4 ${styles.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="border-t border-border pt-3 mt-4">
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start gap-3 text-sm">
                              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-0.5 bg-muted-foreground/50 rounded" />
                              </div>
                              <span className="text-muted-foreground/70">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-epaud-green" />
              <span>Tanpa biaya setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-epaud-green" />
              <span>Batal kapan saja</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-epaud-green" />
              <span>Garansi 30 hari</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
