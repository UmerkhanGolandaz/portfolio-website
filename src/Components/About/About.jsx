import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCode, HiLightBulb, HiUserGroup, HiTrendingUp } from 'react-icons/hi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: HiCode, label: 'Projects Completed', value: '50+' },
    { icon: HiUserGroup, label: 'Clients Satisfied', value: '30+' },
    { icon: HiLightBulb, label: 'Years Experience', value: '5+' },
    { icon: HiTrendingUp, label: 'Success Rate', value: '98%' },
  ];

  const highlights = [
    {
      icon: HiCode,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices.',
    },
    {
      icon: HiLightBulb,
      title: 'Innovation',
      description: 'Constantly exploring new technologies and creative solutions to complex problems.',
    },
    {
      icon: HiUserGroup,
      title: 'Collaboration',
      description: 'Strong team player with excellent communication and leadership skills.',
    },
    {
      icon: HiTrendingUp,
      title: 'Growth Mindset',
      description: 'Committed to continuous learning and professional development.',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-4 text-gradient-alt">
                Passionate About Technology
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                I'm a dedicated software engineer with a passion for creating innovative solutions
                that make a real difference. With years of experience in full-stack development,
                I specialize in building scalable applications and user-centric designs.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                My journey in technology has been driven by curiosity and a constant desire to learn.
                I thrive in challenging environments where I can apply my problem-solving skills
                and collaborate with talented teams.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                When I'm not coding, I enjoy contributing to open-source projects, mentoring aspiring
                developers, and staying updated with the latest tech trends.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass-strong rounded-xl p-6 text-center border border-white/10 hover:border-primary-500/50 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-white" size={28} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;

