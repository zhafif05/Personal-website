'use client'


import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItemData {
  date: string;
  title: string;
  organization: string;
  description: string;
}

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isEducation: boolean;
}

const TimelineItem = ({ item, index, isEducation }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        } flex-col`}
    >
      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="md:w-5/12 w-full"
      >
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
              {isEducation ? (
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              ) : (
                <Briefcase className="w-5 h-5 text-blue-400" />
              )}
            </div>
            <span className="text-sm text-gray-400">{item.date}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-cyan-400 mb-3">{item.organization}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="relative flex items-center justify-center md:w-2/12 w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-gray-900 z-10 shadow-lg shadow-cyan-500/50"
        />
      </div>

      {/* Spacer */}
      <div className="md:w-5/12 w-full" />
    </motion.div>
  );
};

const ParallaxTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for background layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const timelineData = {
    education: [

      {
        date: '2020 - 2023',
        title: 'SMP / MTs',
        organization: 'Fokus Robotik & Teknologi',
        description: 'Mulai mengenal dunia robotik dan elektronika dasar. Belajar merakit robot sederhana, logika pemrograman dasar, sensor, motor, serta mengikuti kegiatan ekstrakurikuler robotik yang menumbuhkan minat di bidang teknologi dan rekayasa.'
      },
      {
        date: '2023 - Sekarang',
        title: 'SMK Telkom Sidoarjo',
        organization: 'Jurusan Sistem Informasi Jaringan dan Aplikasi (SIJA)',
        description: 'Mempelajari jaringan komputer, Internet of Things (IoT), pemrograman web, sistem terintegrasi, serta otomasi berbasis mikrokontroler. Aktif mengembangkan proyek IoT seperti sistem tol otomatis, smart home, dan dashboard monitoring.'
      },
      {
        date: 'Pelatihan & Sertifikasi',
        title: 'Pengembangan Kompetensi IoT & IT',
        organization: 'BNSP • Telkom • Komunitas Teknologi',
        description: 'Mengikuti sertifikasi dan pelatihan seperti Junior IoT Engineer (BNSP), Azure AI Fundamentals, DigiUp Telkom, serta seminar dan workshop teknologi untuk memperkuat kompetensi IoT, AI, dan data.'
      }
    ],
  };

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden bg-black">
      {/* Parallax Background Layers */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 opacity-5"
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg">Education & Professional Experience</p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-cyan-400 mb-12 flex items-center gap-3"
          >
            <GraduationCap className="w-8 h-8" />
            Education
          </motion.h3>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent md:block hidden" />

            <div className="space-y-12">
              {timelineData.education.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  isEducation={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxTimeline;