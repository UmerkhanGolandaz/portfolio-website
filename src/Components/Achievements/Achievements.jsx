import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiAcademicCap, HiTrophy, HiStar, HiLightBulb } from 'react-icons/hi';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      icon: HiTrophy,
      title: 'Hackathon Winner',
      description: 'First place at Tech Innovation Hackathon 2024',
      date: '2024',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: HiAcademicCap,
      title: 'Certified Developer',
      description: 'AWS Solutions Architect Professional Certification',
      date: '2023',
      color: 'from-primary-500 to-blue-600',
    },
    {
      icon: HiStar,
      title: 'Open Source Contributor',
      description: 'Top contributor to popular React libraries',
      date: '2023',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: HiLightBulb,
      title: 'Innovation Award',
      description: 'Company innovation award for AI-powered solution',
      date: '2022',
      color: 'from-cyan-500 to-teal-600',
    },
    {
      icon: HiAcademicCap,
      title: 'Tech Speaker',
      description: 'Keynote speaker at Web Development Conference',
      date: '2022',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: HiTrophy,
      title: 'Best Project Award',
      description: 'University final year project excellence award',
      date: '2021',
      color: 'from-red-500 to-rose-600',
    },
  ];

  return (
    <section id="achievements" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Achievements & <span className="text-gradient">Recognition</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Milestones and accomplishments throughout my journey
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary-500/50 transition-all h-full">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <achievement.icon className="text-white" size={32} />
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 bg-white/5 rounded-full mb-3">
                  <span className="text-xs font-semibold text-gray-400">{achievement.date}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient transition-all">
                  {achievement.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Section - Photos Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-strong rounded-2xl p-8 md:p-12 border border-white/10 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiStar className="text-white" size={40} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Achievement Gallery Coming Soon
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Photos and certificates from conferences, hackathons, and special moments will be showcased here.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full">
              <span className="text-white font-medium">More achievements to be added</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;

