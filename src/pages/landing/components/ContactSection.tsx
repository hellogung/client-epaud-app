import { Link } from "react-router";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@epaud.id",
    link: "mailto:hello@epaud.id",
    color: "epaud-orange",
  },
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 812 3456 7890",
    link: "tel:+6281234567890",
    color: "epaud-pink",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat dengan kami",
    link: "https://wa.me/6281234567890",
    color: "epaud-green",
  },
  {
    icon: MapPin,
    title: "Lokasi",
    value: "Jakarta, Indonesia",
    link: "#",
    color: "epaud-cyan",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-epaud-orange/5 via-transparent to-epaud-pink/5" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-epaud-cyan/20 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={ref}>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-epaud-orange via-epaud-pink to-epaud-purple rounded-3xl p-8 lg:p-12 mb-20 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Siap Membuat Sekolah PAUD Anda Lebih Menyenangkan?
            </h2>

            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Bergabung dengan ratusan sekolah PAUD yang sudah merasakan kemudahan mengelola 
              sekolah dengan EPAUD. Mulai gratis, tanpa kartu kredit!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-epaud-orange hover:bg-white/90 shadow-xl text-base px-8"
                  >
                    Daftar Gratis Sekarang
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-base px-8"
                >
                  Jadwalkan Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form & Info */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Ada Pertanyaan?{" "}
              <span className="bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent">
                Hubungi Kami
              </span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Tim kami siap membantu Anda. Isi formulir di bawah dan kami akan menghubungi Anda 
              dalam waktu 24 jam.
            </p>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
                  <Input
                    placeholder="Masukkan nama Anda"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="email@sekolah.com"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nama Sekolah</label>
                <Input
                  placeholder="TK/PAUD/KB Anda"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Pesan</label>
                <Textarea
                  placeholder="Ceritakan kebutuhan Anda..."
                  className="min-h-[120px] resize-none"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-epaud-orange to-epaud-pink hover:from-epaud-orange/90 hover:to-epaud-pink/90 text-white shadow-lg shadow-epaud-orange/30"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Informasi Kontak
              </h3>
              <p className="text-muted-foreground">
                Jangan ragu untuk menghubungi kami melalui berbagai channel yang tersedia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-${info.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <info.icon className={`w-6 h-6 text-${info.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  <p className="text-sm text-muted-foreground">{info.value}</p>
                </motion.a>
              ))}
            </div>

            {/* FAQ Teaser */}
            <div className="bg-accent/50 rounded-xl p-6">
              <h4 className="font-bold text-foreground mb-3">Pertanyaan Umum</h4>
              <div className="space-y-3">
                {[
                  "Apakah ada trial gratis?",
                  "Bagaimana cara migrasi data?",
                  "Apakah bisa custom fitur?",
                ].map((question, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-epaud-orange" />
                    <span className="text-muted-foreground">{question}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-epaud-orange font-medium mt-4 hover:underline cursor-pointer">
                Lihat semua FAQ →
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
