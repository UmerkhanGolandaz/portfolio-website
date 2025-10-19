import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
// import Scene3D from '../Scene3D/Scene3D';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
      });

      gsap.from('.social-links', {
        opacity: 0,
        x: -20,
        duration: 0.8,
        delay: 1.2,
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-primary-400 text-sm font-medium">👋 Welcome to my portfolio</span>
              </motion.div>

              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Hi, I'm{' '}
                <span className="text-gradient">Umer Khan</span>
              </h1>

              <div className="hero-subtitle text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6 h-20">
                <TypeAnimation
                  sequence={[
                    'Software Engineer',
                    2000,
                    'Problem Solver',
                    2000,
                    'Tech Enthusiast',
                    2000,
                    'Innovator',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-gradient-alt"
                />
              </div>

              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                Passionate about creating innovative solutions and pushing the boundaries of technology.
                Let's build something amazing together.
              </p>
            </motion.div>

            {/* Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-gradient-to-r from-primary-500 to-purple-600 rounded-full overflow-hidden shadow-lg hover:shadow-primary-500/50 transition-shadow cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMail className="mr-2" size={20} />
                Get In Touch
              </motion.a>

              <motion.a
                href="/Umerkhan_Golandaz_Resum (10.1)_2025-09-22T13_48_18.8878881Z.pdf"
                download
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white glass-strong rounded-full border border-primary-500/30 hover:border-primary-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDownload className="mr-2" size={20} />
                Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-links w-12 h-12 flex items-center justify-center glass rounded-full border border-white/10 hover:border-primary-500 hover:text-primary-400 transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Content - Placeholder for 3D Scene */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-primary-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full mx-auto mb-4 animate-pulse"></div>
                <p className="text-xl text-gray-300">3D Character Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-primary-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

