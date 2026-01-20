'use client'

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Code, Palette, Rocket } from 'lucide-react';

interface BackgroundParticle {
  width: number;
  height: number;
  left: number;
  top: number;
  y: number;
  x: number;
  duration: number;
  gradient: string;
}

const ArticlesSection = () => {
  const [backgroundParticles, setBackgroundParticles] = useState<BackgroundParticle[]>([]);

  // Generate particles hanya di client
  useEffect(() => {
    setBackgroundParticles(
      [...Array(40)].map(() => ({
        width: Math.random() * 150 + 20,
        height: Math.random() * 150 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        duration: Math.random() * 10 + 10,
        gradient: ['rgba(6, 182, 212, 0.1)', 'rgba(59, 130, 246, 0.1)', 'rgba(168, 85, 247, 0.1)'][
          Math.floor(Math.random() * 3)
        ],
      }))
    );
  }, []);

  const articles = [
  {
    id: 1,
    icon: Sparkles,
    title: "Siapa Saya?",
    content: "Saya Muhammad Zhafif Rizqullah, siswa SMK Telkom Sidoarjo jurusan SIJA dengan fokus utama pada Internet of Things (IoT), jaringan komputer, dan sistem terintegrasi. Saya terbiasa mengembangkan solusi berbasis hardware dan software yang menghubungkan dunia fisik dengan sistem digital secara real-time.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 2,
    icon: Code,
    title: "IoT & Sistem Terintegrasi",
    content: "Saya memiliki pengalaman membangun berbagai proyek IoT seperti sistem tol otomatis berbasis RFID, smart home, serta dashboard monitoring sensor menggunakan Arduino, ESP8266, MQTT, dan Laravel. Fokus saya adalah menciptakan sistem yang stabil, efisien, dan mudah dikembangkan.",
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 3,
    icon: Palette,
    title: "Kreativitas & Desain Sistem",
    content: "Hobi membaca komik bergenre action, adventure, dan fantasy membentuk cara berpikir kreatif saya dalam merancang solusi teknologi. Saya melihat setiap proyek sebagai sebuah cerita: ada masalah, proses, dan solusi yang harus dirancang dengan detail dan logis.",
    gradient: "from-green-500 to-teal-500",
    bgGradient: "from-green-500/20 to-teal-500/20"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Tujuan & Motivasi",
    content: "Saya berkomitmen untuk terus belajar dan berkembang sebagai IoT Engineer profesional, serta berkontribusi dalam pengembangan otomasi industri dan smart system di Indonesia. Saya tertarik pada proyek nyata yang berdampak dan kolaborasi teknologi yang berkelanjutan.",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/20 to-red-500/20"
  }
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {backgroundParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `radial-gradient(circle, ${particle.gradient}, transparent)`,
            }}
            animate={{
              y: [0, particle.y],
              x: [0, particle.x],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            A Little About Me
          </motion.h2>
          <p className="text-gray-400 text-lg">IoT • Automation • Embedded System • SIJA ✨</p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${article.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />
              
              {/* Card content */}
              <div className={`relative bg-gradient-to-br ${article.bgGradient} backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all`}>
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 bg-gradient-to-br ${article.gradient} rounded-xl mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <article.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  {article.title}
                </h3>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed">
                  {article.content}
                </p>

                {/* Decorative corner */}
                <motion.div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${article.gradient} opacity-10 rounded-bl-full`}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2
                  }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { emoji: '🤖', label: 'Projects', value: '10+' },
            { emoji: '🏆', label: 'Prestasi Nasional', value: '2+' },
            { emoji: '📜', label: 'Sertifikasi', value: '3+' },
            { emoji: '⚡', label: 'Tahun Belajar IoT', value: '3+' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all"
            >
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Tertarik berkolaborasi di bidang IoT, otomasi, atau sistem terintegrasi?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Let's Connect
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;