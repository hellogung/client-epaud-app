import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const footerLinks = {
  produk: [
    { label: "Fitur", href: "#features" },
    { label: "Harga", href: "#pricing" },
    { label: "Demo", href: "/demo" },
    { label: "Update", href: "#" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#about" },
    { label: "Karir", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  dukungan: [
    { label: "Pusat Bantuan", href: "#" },
    { label: "Kontak", href: "#contact" },
    { label: "Dokumentasi", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privasi", href: "#" },
    { label: "Ketentuan", href: "#" },
    { label: "Keamanan", href: "#" },
    { label: "Cookie", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Youtube, href: "#", label: "Youtube", color: "hover:text-red-500" },
  { icon: Linkedin, href: "#", label: "Linkedin", color: "hover:text-blue-600" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <motion.a
                href="#home"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-epaud-orange via-epaud-yellow to-epaud-pink flex items-center justify-center shadow-lg shadow-epaud-orange/30">
                  <span className="text-white font-black text-lg">E</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-epaud-orange to-epaud-pink bg-clip-text text-transparent">
                  EPAUD
                </span>
              </motion.a>

              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Platform manajemen sekolah PAUD terlengkap di Indonesia. 
                Membuat pengelolaan sekolah menjadi mudah dan menyenangkan.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produk</h4>
              <ul className="space-y-3">
                {footerLinks.produk.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Perusahaan</h4>
              <ul className="space-y-3">
                {footerLinks.perusahaan.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Dukungan</h4>
              <ul className="space-y-3">
                {footerLinks.dukungan.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} EPAUD. Hak cipta dilindungi undang-undang.
            </p>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Dibuat dengan</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-epaud-pink fill-epaud-pink" />
              </motion.div>
              <span>di Indonesia 🇮🇩</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="text-epaud-orange font-medium hover:text-epaud-orange/80 transition-colors"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
