'use client'

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Coffee, Heart } from 'lucide-react';

interface Particle {
  width: number;
  height: number;
  left: number;
  top: number;
  y: number;
  x: number;
  duration: number;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({  // Gunakan 20 untuk Footer (lebih ringan)
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        y: Math.random() * 30 - 15,
        x: Math.random() * 30 - 15,
        duration: Math.random() * 5 + 5,
      }))
    );
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/zhafif05',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/muhammmad-zhafif-rizqullah-460b67341/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/zhafifriz',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:zhafifriz05@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', url: '/' },
        { name: 'About Me', url: '/about' },
        { name: 'IoT Projects', url: '/projects' },
        { name: 'Contact', url: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog IoT', url: '/blog' },
        { name: 'Curriculum Vitae', url: '/resume.pdf' },
        { name: 'Certificates', url: '/certificates' }
      ]
    }

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 border-t border-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, particle.y],
              x: [0, particle.x],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Muhammad Zhafif Rizqullah

            </motion.h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              IoT Engineer & Automation Enthusiast dengan fokus pada pengembangan Internet of Things,
              embedded system, dan web-based monitoring dashboard. Terbuka untuk kolaborasi dan
              pengembangan sistem terintegrasi.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-lg text-gray-400 ${social.color} transition-all hover:border-gray-600`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, columnIndex) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: columnIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href={link.url}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Buy Me a Coffee Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 mb-2">Tertarik dengan proyek atau kolaborasi?</p>
              <p className="text-sm text-gray-500">Your support helps me create more amazing projects</p>
            </div>
            
            <motion.a
              href="https://wa.me/6285706183132"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 221, 51, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-lg flex items-center gap-2 shadow-lg hover:shadow-yellow-500/50 transition-all"
            >
              <Coffee className="w-5 h-5" />
              Hubungi untuk Konsultasi IoT
            </motion.a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              className="text-gray-500 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © {currentYear} Muhammad Zhafif Rizqullah. Built with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.span>
              and lots of coffee ☕
            </motion.p>

            <div className="flex gap-6">
              <motion.a
                href="/privacy"
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
              >
                Terms
              </motion.a>
              <motion.a
                href="/sitemap.xml"
                whileHover={{ scale: 1.05 }}
                className="text-gray-500 hover:text-cyan-400 text-sm transition-colors"
              >
                Sitemap
              </motion.a>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all z-50"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;