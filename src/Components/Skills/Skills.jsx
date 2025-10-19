import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript,
  SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiGit,
  SiAmazonwebservices, SiGooglecloud, SiFigma, SiVisualstudio
} from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: SiReact, level: 95, color: '#61DAFB' },
        { name: 'JavaScript', icon: SiJavascript, level: 90, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4' },
      ],
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 88, color: '#339933' },
        { name: 'Python', icon: SiPython, level: 85, color: '#3776AB' },
        { name: 'MongoDB', icon: SiMongodb, level: 82, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: '#4169E1' },
      ],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Docker', icon: SiDocker, level: 78, color: '#2496ED' },
        { name: 'Git', icon: SiGit, level: 90, color: '#F05032' },
        { name: 'AWS', icon: SiAmazonwebservices, level: 75, color: '#FF9900' },
        { name: 'VS Code', icon: SiVisualstudio, level: 85, color: '#007ACC' },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-strong rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${skill.color}15` }}
                        >
                          <skill.icon size={28} style={{ color: skill.color }} />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                          <p className="text-sm text-gray-400">Proficiency: {skill.level}%</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-2 bg-dark-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 glass-strong rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'REST APIs', 'GraphQL', 'CI/CD', 'Agile', 'Microservices',
              'Redux', 'Next.js', 'Express.js', 'Linux', 'Testing',
              'UI/UX Design', 'Performance Optimization', 'Security',
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 glass rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary-500/50 hover:text-primary-400 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

