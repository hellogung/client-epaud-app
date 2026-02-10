import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  School,
  Users,
  CalendarCheck,
  TrendingUp,
  FileText,
  Calendar,
  MessageSquare,
  Camera,
  Smartphone,
  CreditCard,
  UserPlus,
  Sparkles,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

type ColorKey = "orange" | "pink" | "cyan" | "green" | "purple" | "yellow";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: ColorKey;
  benefits: string[];
}

const colorStyles: Record<ColorKey, { bg: string; text: string; dot: string }> = {
  orange: { bg: "bg-epaud-orange/20", text: "text-epaud-orange", dot: "bg-epaud-orange" },
  pink: { bg: "bg-epaud-pink/20", text: "text-epaud-pink", dot: "bg-epaud-pink" },
  cyan: { bg: "bg-epaud-cyan/20", text: "text-epaud-cyan", dot: "bg-epaud-cyan" },
  green: { bg: "bg-epaud-green/20", text: "text-epaud-green", dot: "bg-epaud-green" },
  purple: { bg: "bg-epaud-purple/20", text: "text-epaud-purple", dot: "bg-epaud-purple" },
  yellow: { bg: "bg-epaud-yellow/20", text: "text-epaud-yellow", dot: "bg-epaud-yellow" },
};

const features: Feature[] = [
  {
    id: "school",
    icon: School,
    title: "Manajemen Data Sekolah",
    description: "Kelola profil sekolah, data guru, dan informasi administrasi dengan mudah dan terorganisir.",
    color: "orange",
    benefits: ["Profil sekolah lengkap", "Data guru & staff", "Struktur organisasi", "Dokumen sekolah"],
  },
  {
    id: "students",
    icon: Users,
    title: "Manajemen Data Siswa",
    description: "Pencatatan data siswa lengkap termasuk informasi orang tua, kesehatan, dan perkembangan.",
    color: "pink",
    benefits: ["Data pribadi siswa", "Info orang tua/wali", "Riwayat kesehatan", "Foto & dokumen"],
  },
  {
    id: "attendance",
    icon: CalendarCheck,
    title: "Absensi Siswa dan Guru",
    description: "Sistem absensi digital yang praktis dengan laporan real-time dan notifikasi otomatis.",
    color: "cyan",
    benefits: ["Absensi digital", "Laporan real-time", "Notifikasi ke ortu", "Rekap bulanan"],
  },
  {
    id: "assessment",
    icon: TrendingUp,
    title: "Penilaian & Perkembangan",
    description: "Pantau perkembangan anak dengan sistem penilaian yang sesuai kurikulum PAUD.",
    color: "green",
    benefits: ["Aspek perkembangan", "Portofolio anak", "Grafik progress", "Catatan guru"],
  },
  {
    id: "report",
    icon: FileText,
    title: "Rapor Digital",
    description: "Buat rapor semester dengan format standar yang mudah dan profesional.",
    color: "purple",
    benefits: ["Template standar", "Cetak & digital", "Arsip rapor", "Tanda tangan digital"],
  },
  {
    id: "schedule",
    icon: Calendar,
    title: "Jadwal & Kegiatan",
    description: "Atur jadwal pembelajaran dan kegiatan sekolah dalam kalender terintegrasi.",
    color: "yellow",
    benefits: ["Kalender sekolah", "Jadwal kelas", "Event & acara", "Pengingat otomatis"],
  },
  {
    id: "forum",
    icon: MessageSquare,
    title: "Forum Orang Tua",
    description: "Wadah komunikasi antara sekolah dan orang tua untuk berbagi informasi.",
    color: "orange",
    benefits: ["Grup diskusi", "Pengumuman", "Pesan pribadi", "Polling & survei"],
  },
  {
    id: "documentation",
    icon: Camera,
    title: "Dokumentasi Sekolah",
    description: "Simpan dan kelola foto kegiatan sekolah dalam galeri digital terorganisir.",
    color: "pink",
    benefits: ["Galeri foto", "Album kegiatan", "Berbagi ke ortu", "Cloud storage"],
  },
  {
    id: "parent-app",
    icon: Smartphone,
    title: "Aplikasi Orang Tua",
    description: "Aplikasi khusus untuk orang tua memantau perkembangan dan aktivitas anak.",
    color: "cyan",
    benefits: ["Pantau absensi", "Lihat progress", "Notifikasi", "Bayar SPP"],
  },
  {
    id: "integration",
    icon: CreditCard,
    title: "Integrasi WhatsApp & QRIS",
    description: "Kirim notifikasi via WhatsApp dan terima pembayaran dengan QRIS.",
    color: "green",
    benefits: ["Notif WhatsApp", "Pembayaran QRIS", "Invoice digital", "Rekap keuangan"],
  },
  {
    id: "ppdb",
    icon: UserPlus,
    title: "PPDB Online",
    description: "Sistem penerimaan peserta didik baru secara online yang mudah dan transparan.",
    color: "purple",
    benefits: ["Pendaftaran online", "Seleksi otomatis", "Pembayaran", "Pengumuman"],
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(features[0]);

  const getStyles = (color: ColorKey) => colorStyles[color];

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden bg-accent/30">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,138,76,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-epaud-purple/10 border border-epaud-purple/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-epaud-purple" />
            <span className="text-sm font-medium text-epaud-purple">Fitur Lengkap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mb-6"
          >
            <span className="text-foreground">Semua yang Anda Butuhkan, </span>
            <span className="bg-gradient-to-r from-epaud-purple to-epaud-pink bg-clip-text text-transparent">
              Dalam Satu Platform
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Dari absensi hingga rapor digital, dari PPDB hingga integrasi WhatsApp.
          </motion.p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          <div className="space-y-2">
            {features.slice(0, 6).map((feature, index) => {
              const styles = getStyles(feature.color);
              const isActive = activeFeature.id === feature.id;
              return (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 group ${
                    isActive ? "bg-card border border-border shadow-lg" : "hover:bg-card/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? styles.bg : "bg-muted group-hover:bg-muted-foreground/10"
                  }`}>
                    <feature.icon className={`w-5 h-5 ${isActive ? styles.text : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {feature.title}
                  </span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-all ${
                    isActive ? `${styles.text} translate-x-1` : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`} />
                </motion.button>
              );
            })}
          </div>

          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-xl"
          >
            {(() => {
              const styles = getStyles(activeFeature.color);
              return (
                <>
                  <div className={`w-16 h-16 rounded-2xl ${styles.bg} flex items-center justify-center mb-6`}>
                    <activeFeature.icon className={`w-8 h-8 ${styles.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{activeFeature.title}</h3>
                  <p className="text-muted-foreground mb-6">{activeFeature.description}</p>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Fitur Unggulan:</p>
                    <ul className="space-y-2">
                      {activeFeature.benefits.map((benefit, i) => (
                        <motion.li
                          key={benefit}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </>
              );
            })()}
          </motion.div>

          <div className="space-y-2">
            {features.slice(6).map((feature, index) => {
              const styles = getStyles(feature.color);
              const isActive = activeFeature.id === feature.id;
              return (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  onClick={() => setActiveFeature(feature)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 group ${
                    isActive ? "bg-card border border-border shadow-lg" : "hover:bg-card/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? styles.bg : "bg-muted group-hover:bg-muted-foreground/10"
                  }`}>
                    <feature.icon className={`w-5 h-5 ${isActive ? styles.text : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {feature.title}
                  </span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-all ${
                    isActive ? `${styles.text} translate-x-1` : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {features.map((feature, index) => {
            const styles = getStyles(feature.color);
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${styles.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${styles.text}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-epaud-orange font-semibold hover:underline"
          >
            Lihat Paket Harga
            <ChevronRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
