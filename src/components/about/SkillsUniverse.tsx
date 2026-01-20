'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SkillsUniverse = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const skills = [
    { name: 'Arduino', color: '#F7DF1E', angle: 0, radius: 180, size: 60 },
    { name: 'ESP32', color: '#3178C6', angle: 45, radius: 220, size: 50 },
    { name: 'React.js', color: '#61DAFB', angle: 90, radius: 200, size: 70 },
    { name: 'MQTT', color: '#ffffff', angle: 135, radius: 190, size: 60 },
    { name: 'Node-RED', color: '#00ADD8', angle: 180, radius: 210, size: 55 },
    { name: 'Laravel', color: '#FF2D20', angle: 225, radius: 170, size: 55 },
    { name: 'MySQL', color: '#4479A1', angle: 270, radius: 230, size: 50 },
    { name: 'Networking', color: '#336791', angle: 315, radius: 195, size: 50 },
    { name: 'Express', color: '#336791', angle: 20, radius:300, size: 80 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setRotation(prev => (prev + 0.3) % 360);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const delta = e.clientX - lastX.current;
      setRotation(prev => (prev + delta * 0.3) % 360);
      lastX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      const delta = e.touches[0].clientX - lastX.current;
      setRotation(prev => (prev + delta * 0.3) % 360);
      lastX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const getPosition = (angle: number, radius: number, currentRotation: number) => {
    const totalAngle = (angle + currentRotation) * (Math.PI / 180);
    return {
      x: Math.cos(totalAngle) * radius,
      y: Math.sin(totalAngle) * radius
    };
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-8 left-8 z-10 text-white">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skills Universe
        </h2>
        <p className="text-gray-400">Explore my technical stack</p>
        <p className="text-sm text-gray-500 mt-2">🖱️ Drag to rotate • Hover to view</p>
      </div>

      {/* Star Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3,
              height: Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Universe Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Central Git Hub */}
        <motion.div
          className="relative z-20"
          animate={{
            rotate: rotation * 0.5,
            scale: [1, 1.05, 1]
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl relative">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-600 blur-2xl opacity-50 animate-pulse" />
            
            <div className="relative text-white text-center">
              <div className="text-3xl font-bold">IoT</div>
              <div className="text-xs opacity-80">Automation</div>
            </div>
          </div>
        </motion.div>

        {/* Orbiting Skills */}
        {skills.map((skill, index) => {
          const pos = getPosition(skill.angle, skill.radius, rotation);
          const scale = 0.5 + (Math.sin((skill.angle + rotation) * Math.PI / 180) + 1) / 2 * 0.5;
          
          return (
            <motion.div
              key={skill.name}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${pos.x}px, ${pos.y}px)`,
                zIndex: Math.floor(scale * 10)
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Planet */}
              <motion.div
                className="relative rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  width: skill.size,
                  height: skill.size,
                  backgroundColor: skill.color,
                  boxShadow: `0 0 30px ${skill.color}80`,
                }}
                animate={{
                  scale: hoveredSkill === skill.name ? 1.4 : scale,
                  rotate: rotation * -1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-40"
                  style={{ backgroundColor: skill.color }}
                />
                
                {/* Planet texture */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                </div>

                {/* Skill icon/initial */}
                <div className="relative text-white text-xs font-bold text-center" style={{
                  color: skill.name === 'Next.js' ? '#000000' : '#ffffff',
                  textShadow: skill.name === 'Next.js' ? 'none' : '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                  {skill.name.split('.')[0].substring(0, 2).toUpperCase()}
                </div>
              </motion.div>

              {/* Skill Label */}
              {hoveredSkill === skill.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                >
                  <div className="bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-1 text-white text-sm font-medium shadow-xl">
                    {skill.name}
                  </div>
                </motion.div>
              )}

              {/* Orbit Ring */}
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: skill.radius * 2,
                  height: skill.radius * 2,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  style={{ transform: `rotate(${-rotation}deg)` }}
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r={skill.radius - 25}
                    fill="none"
                    stroke={skill.color}
                    strokeWidth="1"
                    opacity="0.15"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-lg border border-white/10 rounded-lg p-4 text-white max-w-xs z-30">
        <h3 className="font-bold mb-3 text-cyan-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Tech Stack
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {skills.map(skill => (
            <div key={skill.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-gray-300 truncate">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instruction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: 3, delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="text-cyan-400 text-sm font-medium bg-black/60 backdrop-blur-lg border border-cyan-500/30 rounded-full px-6 py-3">
          Drag to explore →
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsUniverse;