import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingShapes = [
  { color: "bg-epaud-orange", size: "w-16 h-16", position: "top-20 left-[10%]", delay: 0 },
  { color: "bg-epaud-cyan", size: "w-12 h-12", position: "top-32 right-[15%]", delay: 0.2 },
  { color: "bg-epaud-pink", size: "w-20 h-20", position: "bottom-32 left-[5%]", delay: 0.4 },
  { color: "bg-epaud-yellow", size: "w-14 h-14", position: "bottom-20 right-[10%]", delay: 0.6 },
  { color: "bg-epaud-purple", size: "w-10 h-10", position: "top-[40%] left-[3%]", delay: 0.8 },
  { color: "bg-epaud-green", size: "w-8 h-8", position: "top-[60%] right-[5%]", delay: 1 },
];

const stats = [
  { value: "500+", label: "Sekolah PAUD" },
  { value: "50K+", label: "Siswa Terdaftar" },
  { value: "10K+", label: "Orang Tua Aktif" },
  { value: "99%", label: "Kepuasan Pengguna" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-epaud-orange/5 via-transparent to-epaud-pink/5 dark:from-epaud-orange/10 dark:to-epaud-pink/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-epaud-yellow/20 to-epaud-orange/20 rounded-full blur-3xl opacity-50 dark:opacity-30" />
      </div>

      {/* Floating Shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { delay: shape.delay, duration: 0.5 },
            scale: { delay: shape.delay, duration: 0.5 },
            y: {
              delay: shape.delay,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute ${shape.position} ${shape.size} ${shape.color} rounded-2xl rotate-12 blur-sm opacity-60 hidden lg:block`}
        />
      ))}

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-epaud-orange/10 border border-epaud-orange/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-epaud-orange" />
              <span className="text-sm font-medium text-epaud-orange">
                #1 Sistem Informasi PAUD Terbaik
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              <span className="text-foreground">Kelola Sekolah </span>
              <span className="bg-gradient-to-r from-epaud-orange via-epaud-pink to-epaud-purple bg-clip-text text-transparent">
                PAUD Anda
              </span>
              <br />
              <span className="text-foreground">dengan </span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-epaud-cyan to-epaud-green bg-clip-text text-transparent">
                  Menyenangkan!
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 h-3 bg-epaud-yellow/30 rounded-full -z-10"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Platform lengkap untuk manajemen sekolah PAUD modern. 
              Dari absensi hingga rapor digital, semua dalam satu genggaman.
              <span className="text-epaud-orange font-semibold"> Mudah, cepat, dan menyenangkan!</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-epaud-orange to-epaud-pink hover:from-epaud-orange/90 hover:to-epaud-pink/90 text-white shadow-xl shadow-epaud-orange/30 text-base px-8"
                  >
                    Mulai Gratis Sekarang
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 group"
                >
                  <Play className="w-5 h-5 mr-1 text-epaud-orange group-hover:scale-110 transition-transform" />
                  Lihat Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative">
              {/* Dashboard Preview Card */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card border border-border rounded-3xl shadow-2xl p-6 relative z-10"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-epaud-orange to-epaud-pink flex items-center justify-center">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Dashboard EPAUD</h3>
                    <p className="text-sm text-muted-foreground">TK Ceria Mandiri</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Total Siswa", value: "125", icon: Heart, color: "epaud-pink" },
                    { label: "Hadir Hari Ini", value: "118", icon: Star, color: "epaud-green" },
                    { label: "Kegiatan", value: "8", icon: Sparkles, color: "epaud-orange" },
                    { label: "Notifikasi", value: "3", icon: Heart, color: "epaud-cyan" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-accent/50 rounded-xl p-4 hover:bg-accent transition-colors"
                    >
                      <item.icon className={`w-5 h-5 text-${item.color} mb-2`} />
                      <div className="text-2xl font-bold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Activity */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Aktivitas Terbaru</h4>
                  {[
                    { text: "Absensi pagi telah dicatat", time: "08:00", color: "bg-epaud-green" },
                    { text: "Rapor semester dikirim", time: "07:30", color: "bg-epaud-orange" },
                    { text: "Pembayaran SPP diterima", time: "Kemarin", color: "bg-epaud-cyan" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                      <span className="flex-1 text-muted-foreground">{activity.text}</span>
                      <span className="text-xs text-muted-foreground/70">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-epaud-green text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
              >
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-sm">Rating 4.9</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-card border border-border px-4 py-3 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-epaud-orange to-epaud-pink border-2 border-white dark:border-card"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">1000+</span>
                    <span className="text-muted-foreground"> guru bergabung</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-epaud-orange rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
