import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovation Corp',
      location: 'Remote',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Improved application performance by 40%',
        'Led a team of 5 developers',
        'Implemented CI/CD pipelines',
      ],
      color: 'from-primary-500 to-blue-600',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Inc',
      location: 'Hybrid',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects, focusing on modern JavaScript frameworks and RESTful APIs.',
      achievements: [
        'Built 15+ client websites',
        'Reduced server costs by 30%',
        'Implemented responsive designs',
      ],
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      location: 'On-site',
      period: '2019 - 2020',
      description: 'Contributed to various projects, learned industry best practices, and collaborated with cross-functional teams.',
      achievements: [
        'Completed 50+ feature implementations',
        'Participated in code reviews',
        'Gained expertise in modern frameworks',
      ],
      color: 'from-cyan-500 to-teal-600',
    },
  ];

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and career milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 via-purple-500 to-transparent"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Left Content */}
                <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass-strong rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary-500/50 transition-all"
                  >
                    {/* Company Badge */}
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} bg-opacity-10 border border-white/10 mb-4`}>
                      <HiBriefcase className="mr-2" size={16} />
                      <span className="text-sm font-semibold">{exp.company}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                      {exp.title}
                    </h3>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div className="flex items-center text-gray-400">
                        <HiCalendar className="mr-2" size={16} />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <HiLocationMarker className="mr-2" size={16} />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary-400 mb-2">
                        Key Achievements:
                      </h4>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-primary-400 mr-2">▸</span>
                          <span className="text-gray-400 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} border-4 border-dark-950 shadow-lg`}
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.color} animate-ping opacity-75`}></div>
                  </motion.div>
                </div>

                {/* Empty Space for Right Side */}
                {index % 2 === 0 && <div className="hidden md:block"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

