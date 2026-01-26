'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category?: string;
  liveUrl: string;
  githubUrl: string;
  gradient?: string;
}

interface ProjectsShowcaseProps {}

const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

const projects = {
  featured: [
    {
      id: 1,
      title: 'Prototipe Sistem Tol Otomatis Berbasis IoT',
      description: 'Membangun sistem palang pintu tol otomatis menggunakan Arduino dan sensor RFID untuk mendeteksi kartu pengguna dan membuka palang secara otomatis.',
      image: '/tol.jpeg',
      tags: ['Arduino', 'RFID', 'IoT', 'Embedded'],
      liveUrl: 'https://youtube.com/shorts/tr9p7oaX5UM?si=mIBBheYfq6kvadKq',
      githubUrl: 'https://github.com/zhafif05/Tol-otomatis.git',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Dashboard Monitoring IoT',
      description: 'Dashboard web lokal untuk menampilkan data sensor suhu, kelembaban, serta gas CO, CO₂, dan NH₄ yang dikirim melalui ESP8266 dan Mosquitto MQTT.',
      image: '/smarthome.png',
      tags: ['ESP8266', 'MQTT', 'IoT', 'Web Dashboard'],
      liveUrl: 'https://www.youtube.com/shorts/u6opS8lj0EU',
      githubUrl: 'https://github.com/zhafif05/dashboar-monitoring.git',
      gradient: 'from-green-500 to-teal-600'
    },
{
      id: 3,
      title: 'Robot Panen Bandeng – ROBOCO DARJO',
      description: 'Robot kompetisi untuk simulasi panen bandeng pada lomba ROBOCO DARJO, dirancang untuk mengambil dan memindahkan bola sebagai representasi ikan bandeng menggunakan sistem mekanik dan kontrol terprogram.',
      image: '/robot.jpeg',
      tags: ['Robotik', 'Embedded System', 'Kontrol', 'Kompetisi'],
      liveUrl: 'https://youtu.be/38EABrCGsgc?si=4M3PDVnw6fjil_sw',
      githubUrl: 'https://github.com/zhafif05/ROBOCO-DARJO.git',
      gradient: 'from-orange-500 to-yellow-500'
    }
  ],

  all: [
    {
      id: 4,
      title: 'Prototipe Sistem Tol Otomatis Berbasis IoT',
      description: 'Sistem palang pintu tol otomatis menggunakan Arduino dan RFID sebagai identifikasi kartu pengguna.',
      image: '/tol.jpeg',
      tags: ['Arduino', 'RFID', 'IoT'],
      category: 'iot',
      liveUrl: 'https://youtube.com/shorts/tr9p7oaX5UM?si=mIBBheYfq6kvadKq',
      githubUrl: 'https://github.com/zhafif05/tol-otomatis-iot'
    },
    {
      id: 5,
      title: 'Dashboard Monitoring IoT',
      description: 'Web dashboard lokal untuk monitoring data sensor suhu, kelembaban, dan gas berbasis ESP8266 dan Mosquitto MQTT.',
      image: '/smarthome.png',
      tags: ['ESP8266', 'MQTT', 'Laravel'],
      category: 'iot',
      liveUrl: 'https://www.youtube.com/shorts/u6opS8lj0EU',
      githubUrl: 'https://github.com/zhafif05/dashboar-monitoring.git'
    },
    {
      id: 6,
      title: 'Kipas Otomatis Berbasis IoT',
      description: 'Sistem kipas otomatis berbasis sensor suhu yang dapat dikontrol dan dimonitor melalui web.',
      image: '/kipas.jpg',
      tags: ['Arduino', 'Sensor Suhu', 'IoT'],
      category: 'iot',
      liveUrl: 'https://youtube.com/shorts/BpL013KEiek?si=FigyCwPDpSma23Ot',
      githubUrl: 'https://github.com/zhafif05/kipas-otomatis-iot'
    },
    {
      id: 7,
      title: 'Website Toko dengan Laravel',
      description: 'Website toko dengan fitur tambah/edit produk, upload gambar, dan manajemen data menggunakan Laravel.',
      image: '/toko.png',
      tags: ['Laravel', 'HTML', 'CSS', 'MySQL'],
      category: 'web',
      liveUrl: '#',
      githubUrl: 'https://github.com/zhafif05/website-toko'
    },
    {
      id: 8,
      title: 'Dashboard Smart Home',
      description: 'Dashboard IoT lokal untuk monitoring sensor dan kontrol perangkat smart home berbasis ESP8266 dan MQTT.',
      image: '/smarthome.png',
      tags: ['IoT', 'ESP8266', 'MQTT','AI'],
      category: 'iot',
      liveUrl: 'https://www.youtube.com/shorts/u6opS8lj0EU',
      githubUrl: 'https://github.com/zhafif05/dashboar-monitoring.git'
    },
    {
      id: 9,
      title: 'Website Rekomendasi Lagu dengan AI',
      description: 'Sistem rekomendasi lagu berdasarkan mood pengguna menggunakan API Gemini dan Spotify.',
      image: '/spotyai.jpeg',
      tags: ['AI', 'Gemini API', 'Spotify API'],
      category: 'web',
      liveUrl: '#',
      githubUrl: 'https://github.com/vaiozaffana/moodyfai_frontend.git'
    },{
      id: 10,
      title: 'Robot Panen Bandeng – ROBOCO DARJO',
      description: 'Robot kompetisi untuk simulasi panen bandeng pada lomba ROBOCO DARJO, dirancang untuk mengambil dan memindahkan bola sebagai representasi ikan bandeng menggunakan sistem mekanik dan kontrol terprogram.',
      image: '/robot.jpeg',
      tags: ['Robotik', 'Embedded System', 'Kontrol', 'Kompetisi'],
      category: 'iot',
      liveUrl: 'https://youtu.be/38EABrCGsgc?si=4M3PDVnw6fjil_sw',
      githubUrl: 'https://github.com/zhafif05/ROBOCO-DARJO.git',
      gradient: 'from-orange-500 to-yellow-500'
    }
  ]
};

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web / Apps' },
    { id: 'iot', label: 'IoT Projects' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects.all 
    : projects.all.filter(p => p.category === activeFilter);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === projects.featured.length - 1 ? 0 : prev + 1
    );
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => 
      prev === 0 ? projects.featured.length - 1 : prev - 1
    );
  };

  const FeaturedProject = ({ project }: { project: Project }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className={`bg-gradient-to-br ${project.gradient} rounded-2xl p-1`}>
        <div className="bg-gray-900 rounded-2xl p-8 h-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Project Visual */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-9xl text-center"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-w-sm mx-auto rounded-xl"
                />  
              </motion.div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-cyan-400 font-medium"
                >
                  Featured Project
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold text-white mt-2"
                >
                  {project.title}
                </motion.h3>
              </div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg leading-relaxed"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <motion.a
                  href={project.liveUrl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg flex items-center gap-2 hover:bg-cyan-500/10 transition-all"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all">
        {/* Project Icon */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>


        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              className="flex-1 py-2 bg-cyan-500/10 text-cyan-400 text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
            <a
              href={project.githubUrl}
              className="flex-1 py-2 bg-gray-800 text-gray-400 text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">Showcasing my best work</p>
        </motion.div>

        {/* Featured Carousel */}
        <div className="mb-20">
          <div className="relative">
            <AnimatePresence mode="wait">
              <FeaturedProject project={projects.featured[currentFeaturedIndex]} />
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevFeatured}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-full text-white hover:bg-gray-700 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextFeatured}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-full text-white hover:bg-gray-700 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.featured.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeaturedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentFeaturedIndex
                      ? 'w-8 bg-cyan-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white">All Projects</h3>
            
            {/* Filter */}
            <div className="flex gap-2 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-lg p-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;