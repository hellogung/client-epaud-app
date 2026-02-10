import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Shield, Zap, Users, Sparkles, GraduationCap, type LucideIcon } from "lucide-react";

type ColorKey = "pink" | "cyan" | "yellow" | "purple";

const colorStyles: Record<ColorKey, { bg: string; text: string }> = {
  pink: { bg: "bg-epaud-pink/10", text: "text-epaud-pink" },
  cyan: { bg: "bg-epaud-cyan/10", text: "text-epaud-cyan" },
  yellow: { bg: "bg-epaud-yellow/10", text: "text-epaud-yellow" },
  purple: { bg: "bg-epaud-purple/10", text: "text-epaud-purple" },
};

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorKey;
}

const values: Value[] = [
  { icon: Heart, title: "Penuh Kasih Sayang", description: "Dirancang untuk mendukung tumbuh kembang anak usia dini.", color: "pink" },
  { icon: Shield, title: "Aman & Terpercaya", description: "Data sekolah terlindungi dengan keamanan enterprise.", color: "cyan" },
  { icon: Zap, title: "Cepat & Efisien", description: "Hemat waktu administrasi hingga 80% dengan otomatisasi.", color: "yellow" },
  { icon: Users, title: "Kolaboratif", description: "Hubungkan guru, orang tua, dan sekolah dalam satu platform.", color: "purple" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-epaud-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-epaud-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-epaud-cyan/10 border border-epaud-cyan/20 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-epaud-cyan" />
            <span className="text-sm font-medium text-epaud-cyan">Tentang EPAUD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          >
            <span className="text-foreground">Mengapa </span>
            <span className="bg-gradient-to-r from-epaud-cyan to-epaud-green bg-clip-text text-transparent">
              Ribuan Sekolah
            </span>
            <span className="text-foreground"> Memilih EPAUD?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Solusi lengkap manajemen sekolah PAUD yang dirancang khusus untuk kebutuhan pendidikan anak usia dini di Indonesia.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {values.map((value, index) => {
            const styles = colorStyles[value.color];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-epaud-orange/5 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl ${styles.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`w-7 h-7 ${styles.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-8 bg-gradient-to-br from-epaud-orange/20 via-epaud-pink/20 to-epaud-purple/20 rounded-full" />
              <div className="absolute inset-16 bg-gradient-to-br from-epaud-cyan/30 to-epaud-green/30 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-epaud-orange mx-auto mb-4" />
                  <span className="text-6xl font-black bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent">5+</span>
                  <p className="text-muted-foreground font-medium mt-2">Tahun Pengalaman</p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white dark:bg-card border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-epaud-green">98%</div>
                <div className="text-xs text-muted-foreground">Retensi Pelanggan</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-4 bg-white dark:bg-card border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-epaud-pink">24/7</div>
                <div className="text-xs text-muted-foreground">Dukungan Pelanggan</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Cerita Kami Dimulai dari{" "}
              <span className="bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent">Kepedulian</span>
            </h3>

            <div className="space-y-4 text-muted-foreground">
              <p>
                EPAUD lahir dari keinginan membantu ribuan sekolah PAUD di Indonesia mengelola operasional dengan lebih efisien.
              </p>
              <p className="font-medium text-foreground">
                Misi kami: <span className="text-epaud-orange">Membuat pengelolaan sekolah PAUD semudah dan semenyenangkan bermain.</span>
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Sekolah Terdaftar", value: "500+" },
                { label: "Provinsi", value: "34" },
                { label: "Fitur Lengkap", value: "50+" },
                { label: "Uptime", value: "99.9%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-epaud-green" />
                  <div>
                    <span className="font-bold text-foreground">{item.value}</span>{" "}
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
