import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiExternalLink, HiCode, HiStar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'web',
      description: 'A full-featured e-commerce platform with payment integration, real-time inventory, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'AI Task Manager',
      category: 'ai',
      description: 'Smart task management application with AI-powered prioritization and scheduling recommendations.',
      technologies: ['React', 'Python', 'TensorFlow', 'FastAPI'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'Social Media Dashboard',
      category: 'web',
      description: 'Analytics dashboard for managing multiple social media accounts with real-time metrics and insights.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Mobile Fitness App',
      category: 'mobile',
      description: 'Cross-platform fitness tracking app with workout plans, progress tracking, and social features.',
      technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Real-time Chat Application',
      category: 'web',
      description: 'Scalable chat application with video calls, file sharing, and end-to-end encryption.',
      technologies: ['React', 'Socket.io', 'WebRTC', 'Redis'],
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80',
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'IoT Home Automation',
      category: 'iot',
      description: 'Smart home automation system with mobile control, voice commands, and energy monitoring.',
      technologies: ['React', 'Node.js', 'MQTT', 'Raspberry Pi'],
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      github: '#',
      live: '#',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'iot', label: 'IoT' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing my best work and innovative solutions
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                  : 'glass text-gray-300 hover:text-white border border-white/10 hover:border-primary-500/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative glass-strong rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all"
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                      <HiStar className="mr-1" size={14} />
                      <span className="text-xs font-bold text-white">Featured</span>
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-400 rounded-full border border-primary-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center justify-center flex-1 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all group/btn"
                    >
                      <FaGithub className="mr-2 group-hover/btn:scale-110 transition-transform" size={16} />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center justify-center flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-primary-500/50 transition-all group/btn"
                    >
                      <HiExternalLink className="mr-2 group-hover/btn:scale-110 transition-transform" size={16} />
                      <span className="text-sm font-medium">Live</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;

