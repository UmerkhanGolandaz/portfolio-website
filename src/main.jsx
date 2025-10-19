import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import emailjs from '@emailjs/browser'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, OrbitControls, Sphere, Torus } from '@react-three/drei'
import { motion } from 'framer-motion'

// EmailJS Configuration
const PUBLIC_KEY = 'X83PeK-V4wppuzTFo';
const SERVICE_ID = 'service_qrv6ast';
const TEMPLATE_ID = 'template_xx1dvm7';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Animated 3D Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b6b" />
        <pointLight position={[-10, -10, 10]} intensity={0.8} color="#4ecdc4" />
        <pointLight position={[0, 10, -10]} intensity={0.7} color="#45b7d1" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} speed={1} />
        <FloatingSpheres />
        <RotatingRings />
      </Canvas>
    </div>
  );
};

// Floating Spheres Component
const FloatingSpheres = () => {
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();
  const sphere3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(time * 0.5) * 3;
      sphere1Ref.current.position.y = Math.cos(time * 0.3) * 2;
      sphere1Ref.current.rotation.x = time * 0.2;
      sphere1Ref.current.rotation.y = time * 0.4;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(time * 0.4) * -4;
      sphere2Ref.current.position.y = Math.sin(time * 0.6) * 3;
      sphere2Ref.current.rotation.x = time * -0.3;
      sphere2Ref.current.rotation.z = time * 0.5;
    }
    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.sin(time * 0.7) * 5;
      sphere3Ref.current.position.y = Math.cos(time * 0.8) * -2;
      sphere3Ref.current.rotation.y = time * 0.6;
      sphere3Ref.current.rotation.z = time * -0.2;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphere1Ref} args={[0.8, 32, 32]} position={[2, 1, -8]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Sphere ref={sphere2Ref} args={[0.6, 32, 32]} position={[-3, 2, -6]}>
          <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.4} />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2.2}>
        <Sphere ref={sphere3Ref} args={[1, 32, 32]} position={[4, -1, -10]}>
          <meshStandardMaterial color="#45b7d1" emissive="#45b7d1" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    </>
  );
};

// Rotating Rings Component
const RotatingRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(time * 0.3) * 0.5;
      ring1Ref.current.rotation.z = time * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.6;
      ring2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * -0.3;
      ring3Ref.current.rotation.y = Math.sin(time * 0.5) * 0.4;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[2, 0.1, 16, 100]} position={[0, 0, -5]}>
        <meshStandardMaterial color="#ff9ff3" emissive="#ff9ff3" emissiveIntensity={0.5} />
      </Torus>
      <Torus ref={ring2Ref} args={[3, 0.1, 16, 100]} position={[0, 0, -5]}>
        <meshStandardMaterial color="#54a0ff" emissive="#54a0ff" emissiveIntensity={0.4} />
      </Torus>
      <Torus ref={ring3Ref} args={[4, 0.1, 16, 100]} position={[0, 0, -5]}>
        <meshStandardMaterial color="#5f27cd" emissive="#5f27cd" emissiveIntensity={0.3} />
      </Torus>
    </>
  );
};

// Simple portfolio with Tailwind
function PortfolioApp() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading state
    setFormStatus('sending');
    
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', reason: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen overflow-hidden">
      {/* Animated 3D Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
      {/* Header */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-slate-900/98 backdrop-blur-lg border-b border-blue-800/30 p-4 shadow-xl"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Modern Professional Logo */}
            <div className="relative w-12 h-12 group">
              <motion.svg 
                viewBox="0 0 120 120" 
                className="w-full h-full drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              >
                <defs>
                  <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#1e40af"/>
                    <stop offset="100%" stopColor="#64748b"/>
                  </linearGradient>
                  <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e40af"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                  <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Modern U-Shaped design */}
                <path
                  d="M 30 25 L 90 25 L 90 45 L 70 45 L 70 75 L 80 75 L 80 95 L 50 95 L 50 75 L 60 75 L 60 45 L 30 45 Z"
                  fill="url(#logoGradient1)"
                  filter="url(#logoGlow)"
                  className="group-hover:fill-[url(#logoGradient2)] transition-all duration-500"
                />
                
                {/* Inner accent */}
                <rect x="45" y="35" width="30" height="15" rx="3" fill="white" opacity="0.3"/>
                <rect x="50" y="40" width="20" height="5" rx="2" fill="white" opacity="0.6"/>
              </motion.svg>
            </div>
            
            {/* Clean Typography */}
            <div className="flex flex-col">
              <motion.h1 
                className="text-2xl font-black tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                  Umerkhan
                </span>
              </motion.h1>
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <span className="text-sm font-medium text-gray-300 tracking-wide">Golandaz</span>
              </motion.div>
          </div>
          </motion.div>
          {/* Professional Navigation Menu */}
          <motion.nav 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { href: "#about", label: "About" },
              { href: "#projects", label: "Projects" },
              { href: "#experience", label: "Experience" },
              { href: "#contact", label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6 + index * 0.1, 
                  duration: 0.5
                }}
              >
                <motion.a 
                  href={item.href} 
                  className="relative text-white font-medium hover:text-blue-400 transition-colors duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {/* Underline effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </motion.div>
            ))}
            
            {/* Professional Separator */}
            <div className="w-px h-6 bg-slate-600 mx-4"></div>
            
            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1.0, 
                duration: 0.5
              }}
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 rounded-lg font-semibold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.nav>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span 
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
          </div>
        
        {/* Mobile Menu */}
        <motion.div
          className={`fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-lg md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -100 }}
          animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-24 px-6">
            <div className="space-y-4">
              {[
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#contact", label: "Contact" }
              ].map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block p-4 text-lg font-medium text-white hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              {/* Mobile Resume Button */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white text-center text-lg shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isMobileMenuOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.6 }}
              >
                Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-6xl mx-auto relative z-10">
          {/* Main Name */}
          <motion.div
            className="relative mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                Umerkhan
              </span>{' '}
              <span className="text-gray-100 font-light">Golandaz</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-4 font-medium"
          >
            Computer Engineering Student & AI/ML Enthusiast
          </motion.p>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-base text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Specializing in Machine Learning, Deep Learning, and Computer Vision. Building innovative solutions for real-world problems with cutting-edge technology.
          </motion.p>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
          >
            {/* Hackathon Winner Badge */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-lg px-6 py-4 border border-slate-600/30 flex items-center gap-4 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏆</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Fusion 2025 National Hackathon Winner</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-400 text-xs">AI/ML Domain</span>
                </div>
              </div>
            </div>

            {/* Academic Achievement Badge */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-lg px-6 py-4 border border-slate-600/30 flex items-center gap-4 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🎓</span>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Academic Excellence</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                  <span className="text-gray-400 text-xs">Computer Engineering</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-wrap justify-center items-center gap-4 text-gray-400 text-sm mb-12"
          >
            <span className="hover:text-blue-400 transition-colors cursor-pointer">umerkhan0207@gmail.com</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer">+91 8830941742</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <a href="https://www.linkedin.com/in/umerkhan-g-36186529a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-blue-500">
              LinkedIn
            </a>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <a href="https://github.com/UmerkhanGolandaz" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-blue-500">
              GitHub
            </a>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
          >
            <a 
              href="#about" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-semibold text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
            >
              About Me <span className="text-sm">↓</span>
            </a>
            <a 
              href="#projects" 
              className="px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-600/30 rounded-lg font-semibold text-white hover:bg-slate-700/60 hover:border-blue-500/50 transition-all duration-300"
            >
              View My Projects
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col items-center gap-3 text-gray-500 text-xs"
          >
            <span className="tracking-wide">SCROLL</span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-gray-500"></div>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="relative py-20 px-4 bg-slate-800/30"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="bg-slate-800/60 backdrop-blur-lg rounded-xl p-8 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text">AI & ML Enthusiast</h3>
              <p className="text-gray-200 mb-4">
                Enthusiastic and detail-oriented Computer Engineering student with strong skills in Python, web development, and AI/ML frameworks. Experienced in building projects involving Generative AI, deep learning (LSTM, CNN), web applications, mobile app development, and data processing through internships and academic work.
              </p>
              <p className="text-gray-300">
                Skilled at working both independently and in teams, with proven abilities in problem-solving, project execution, and integrating modern technologies to deliver impactful, user-focused solutions.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { title: 'Machine Learning', desc: 'Deep Learning & AI', color: 'from-blue-500/20 to-slate-500/20', border: 'border-blue-400/30' },
                { title: 'Data Science', desc: 'Analysis & Visualization', color: 'from-slate-500/20 to-gray-500/20', border: 'border-slate-400/30' },
                { title: 'Computer Vision', desc: 'Image Processing', color: 'from-gray-500/20 to-blue-500/20', border: 'border-gray-400/30' },
                { title: 'Research', desc: 'Continuous learning', color: 'from-blue-600/20 to-slate-600/20', border: 'border-blue-500/30' }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-md rounded-xl p-6 border ${item.border} hover:border-blue-400/50 transition-all duration-300 hover:scale-105`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold mb-2 text-transparent bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            </div>
          </div>
      </motion.section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Technical <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Python', level: 95, color: '#2563eb' },
              { name: 'Java', level: 90, color: '#dc2626' },
              { name: 'JavaScript', level: 88, color: '#0ea5e9' },
              { name: 'React', level: 85, color: '#0891b2' },
              { name: 'Web Development', level: 82, color: '#059669' },
              { name: 'App Development', level: 80, color: '#7c3aed' },
              { name: 'TensorFlow', level: 78, color: '#ea580c' },
              { name: 'CNN/LSTM', level: 75, color: '#be123c' },
              { name: 'C/C++', level: 72, color: '#64748b' }
            ].map((skill, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Professional <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">AI & Web Development Intern</h3>
                  <p className="text-blue-400 font-semibold">Alesa AI - UK</p>
                </div>
                <div className="text-gray-400 text-sm mt-2 md:mt-0">
                  October 2024 - March 2025
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Contributed to AI-driven projects by training and fine-tuning machine learning models and LLMs for real-world applications. Integrated LLMs and AI models into web and mobile applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Trained ML models & LLMs', 'AI model deployment', 'Built AI palm reading system', 'API integration'].map((achievement, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience 2 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Project Intern</h3>
                  <p className="text-blue-400 font-semibold">Elenxia</p>
                </div>
                <div className="text-gray-400 text-sm mt-2 md:mt-0">
                  May 2024 - July 2024
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Cleaned and transformed large volumes of web-scraped, unorganized data, ensuring consistency and usability. Applied feature engineering and imputation techniques to improve dataset quality.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Data cleaning & transformation', 'Feature engineering', 'Data visualization', 'Pattern analysis'].map((achievement, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 rounded-full border border-slate-500/20">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 - Fatigue Detection */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-slate-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AI</span>
                  </div>
                  <p className="text-gray-300">Fatigue Detection</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-slate-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  Fatigue Detection Using EfficientNet V2
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Developed a fatigue detection system using CNNs trained on a dataset of 8,000 images. Achieved 92% accuracy in detecting drowsiness and fatigue through facial cues.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'CNN', 'EfficientNetV2', 'Computer Vision'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2 - Google Play Store Analysis */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="h-48 bg-gradient-to-br from-slate-500/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">ML</span>
                  </div>
                  <p className="text-gray-300">Sentiment Analysis</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-slate-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  Machine Learning for Customer Experience in Financial Services
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Built a BERT-based NLP model to analyze customer sentiment and improve user experience. Extracted insights from financial datasets to support decision-making.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'BERT', 'NLP', 'Sentiment Analysis'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 rounded-full border border-slate-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz/Google_playstore_UPIapps_review_analysis" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-slate-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 3 - AI-powered Learning Platform */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-teal-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🎓</span>
                  </div>
                  <p className="text-gray-300">AI Learning Platform</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  AI-powered Learning Platform for Children
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Developed an intelligent learning platform using AI to create personalized educational experiences for children. Features adaptive learning paths, interactive content, and progress tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['AI/ML', 'React', 'Python', 'Educational Tech'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 rounded-full border border-slate-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-slate-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Project 4 - Power System Fault Detection */}
            <motion.div
              className="bg-gradient-to-br from-slate-500/10 via-blue-500/10 to-gray-500/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-slate-400/30 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-slate-500/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">⚡</span>
                  </div>
                  <p className="text-gray-300">Power Systems</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  Power-System-Fault-Detection-and-Classification
                </h3>
                <p className="text-purple-300 text-sm mb-4">
                  Advanced machine learning system for detecting and classifying faults in power systems. Implements deep learning algorithms to analyze electrical signals and predict system failures with high accuracy for improved grid reliability.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'Deep Learning', 'Power Systems', 'Signal Processing', 'ML', 'TensorFlow'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz/Power-System-Fault-Detection-and-Classification" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center text-cyan-300 hover:text-white">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Project 5 - AI Mental Health Assessment */}
            <motion.div
              className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-400/30 hover:border-teal-400/50 transition-all duration-300 group hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🧠</span>
                  </div>
                  <p className="text-pink-300">Mental Health AI</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  AI-Powered Mental Health Assessment Tool
                </h3>
                <p className="text-emerald-300 text-sm mb-4">
                  Developed an AI model that predicts the percentage of people in specific demographics who have mental health symptoms. Uses advanced machine learning techniques for demographic-based mental health assessment and prevention strategies.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'AI/ML', 'Statistics', 'Demographics', 'Health Tech', 'Predictive Analytics'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz/AI-Powered-Mental-Health-Assessment-Tool" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center text-cyan-300 hover:text-white">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Project 6 - EdgeCompress */}
            <motion.div
              className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-indigo-400/30 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🗜️</span>
                  </div>
                  <p className="text-cyan-300">AI Compression</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  EdgeCompress - AI Model Compression Platform
                </h3>
                <p className="text-indigo-300 text-sm mb-4">
                  Advanced AI model compression platform designed for edge deployment. Implements state-of-the-art compression techniques including quantization, pruning, and knowledge distillation to optimize neural networks for mobile and IoT devices.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Python', 'PyTorch', 'TensorFlow', 'Optimization', 'Edge Computing', 'ML'].map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com/UmerkhanGolandaz/EdgeCompress" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-medium text-center text-cyan-300 hover:text-white">
                    View Code
                  </a>
                  <button className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all text-sm font-medium">
                    Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Achievements & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Recognition</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Achievement 2 - Fusion 2025 Hackathon Winner */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-500/50 transition-all col-span-1 md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-white font-bold text-2xl">🏆</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-yellow-400">Fusion 2025 National Hackathon Winner</h3>
                  <p className="text-gray-400 text-lg mb-3">🏆 AI/Machine Learning Domain Winner</p>
                  <p className="text-gray-300 text-base mb-4">Led team "Code IQ" to victory in the National Level Hackathon organized by IIC E-Cell IEEE Student Branch. Demonstrated exceptional technical skills, innovative problem-solving, and outstanding teamwork in developing AI/ML solutions.</p>
                  
                  {/* Hackathon Details */}
                  <div className="bg-slate-800/40 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 font-semibold">Event:</span>
                        <span className="text-gray-300">Fusion 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 font-semibold">Team:</span>
                        <span className="text-gray-300">T007 - Code IQ [AIML]</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 font-semibold">Date:</span>
                        <span className="text-gray-300">Oct 9-10, 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm font-medium bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                      🏆 National Winner
                    </span>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                      🤖 AI/ML Domain
                    </span>
                    <span className="px-3 py-1 text-sm font-medium bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                      👥 Team Leadership
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">📄</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Research Paper Published</h3>
              <p className="text-gray-400 text-sm mb-3">Taylor & Francis (2024)</p>
              <p className="text-gray-300 text-sm">Published research paper on "Precision fatigue detection" in reputed Taylor & Francis journal.</p>
            </div>

            {/* Achievement 4 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cybersecurity Research</h3>
              <p className="text-gray-400 text-sm mb-3">IJFMR Journal (2025)</p>
              <p className="text-gray-300 text-sm">Published research paper on "Enhancing cybersecurity through AI" in IJFMR journal.</p>
            </div>

            {/* Achievement 5 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">⚽</span>
              </div>
              <h3 className="text-xl font-bold mb-2">State-Level Football Player</h3>
              <p className="text-gray-400 text-sm mb-3">Sports Achievement</p>
              <p className="text-gray-300 text-sm">Represented at state tournaments, developing strong teamwork, discipline, and leadership qualities.</p>
            </div>

            {/* Achievement 6 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🏋️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Athletics & Fitness Enthusiast</h3>
              <p className="text-gray-400 text-sm mb-3">Personal Development</p>
              <p className="text-gray-300 text-sm">Active in gym and sports, demonstrating commitment, consistency, and a goal-oriented mindset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Photo <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gallery</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Explanation to University Guest */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/hackathon/WhatsApp Image 2025-10-12 at 01.13.57_b4b975fe.jpg" 
                  alt="Project Explanation to University Guest" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">🏛️ University Guest Presentation</h3>
                <p className="text-gray-400 text-sm">Explaining my project to university guests, demonstrating technical expertise and project knowledge.</p>
              </div>
            </div>

            {/* Fatigue Project Explanation to 1st Year Students */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/hackathon/WhatsApp Image 2025-10-12 at 01.13.57_f37fa682.jpg" 
                  alt="Fatigue Project Explanation to 1st Year Students" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">🎓 Student Teaching</h3>
                <p className="text-gray-400 text-sm">Explaining my fatigue detection project to 1st year students at college, sharing knowledge and inspiring peers.</p>
              </div>
            </div>

            {/* Hackathon Victory */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/hackathon/IMG_1661 (1).JPG" 
                  alt="Hackathon Victory" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">🏆 Hackathon Victory</h3>
                <p className="text-gray-400 text-sm">Team "Code IQ" celebrating our victory at Fusion 2025 National Level Hackathon in AI/ML domain.</p>
              </div>
            </div>

            {/* Award and Certificate */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/hackathon/WhatsApp Image 2025-10-11 at 21.27.11_99033229.jpg" 
                  alt="Award and Certificate" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">🏅 Award and Certificate</h3>
                <p className="text-gray-400 text-sm">Winner award and certificate from Fusion 2025 National Hackathon - AI/Machine Learning Domain.</p>
              </div>
            </div>

            {/* Certificate Photo */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/hackathon/WhatsApp Image 2025-10-11 at 21.28.27_e0e4ac0f.jpg" 
                  alt="Winner Certificate" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">📜 Winner Certificate</h3>
                <p className="text-gray-400 text-sm">Certificate of Excellence recognizing outstanding innovation and technical excellence in Fusion 2025 Hackathon.</p>
              </div>
            </div>

            {/* Placeholder for future photos */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">📸</span>
                  </div>
                  <p className="text-gray-300">More Photos</p>
                  <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">📸 More Memories</h3>
                <p className="text-gray-400 text-sm">More photos and achievements will be added here as I continue my journey in AI/ML and web development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Certifications & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Certification 1 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
              <p className="text-gray-400 text-sm mb-3">Empowering Business with Effective Insights</p>
              <p className="text-gray-300 text-sm">Mastered data visualization techniques for business intelligence and decision-making.</p>
            </div>

            {/* Certification 2 */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">⚛️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Frontend Development</h3>
              <p className="text-gray-400 text-sm mb-3">Meta on Coursera</p>
              <p className="text-gray-300 text-sm">Introduction to Frontend Development course by Meta, covering modern web technologies.</p>
            </div>

            {/* Certification 3 */}
            <motion.div
              className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">📋</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Project Management Specialization</h3>
              <p className="text-gray-400 text-sm mb-3">LinkedIn Learning</p>
              <p className="text-gray-300 text-sm mb-4">Agile, Scrum, risk management, and time management methodologies. Complete specialization in project management.</p>
              <a 
                href="https://www.linkedin.com/learning/project-management-specialization" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                View Certification
              </a>
            </motion.div>

            {/* Certification 4 */}
            <motion.div
              className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Generative AI Bootcamp</h3>
              <p className="text-gray-400 text-sm mb-3">IBM Bootcamp</p>
              <p className="text-gray-300 text-sm">Hands-on training in LLMs, prompt engineering, and AI applications.</p>
            </motion.div>

            {/* Certification 5 - IBM Full Stack */}
            <motion.div
              className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">💻</span>
            </div>
              <h3 className="text-xl font-bold mb-2">Full Stack Development Specialization</h3>
              <p className="text-gray-400 text-sm mb-3">IBM on Coursera</p>
              <p className="text-gray-300 text-sm mb-4">Comprehensive full-stack development specialization covering frontend, backend, databases, and cloud deployment with IBM technologies.</p>
              <a 
                href="https://www.coursera.org/specializations/ibm-full-stack-cloud-developer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                View Certification
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for Contact *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a reason</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="job">Job Opportunity</option>
                    <option value="project">Project Discussion</option>
                    <option value="internship">Internship Inquiry</option>
                    <option value="question">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your message..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-lg font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                
                <div className="text-center text-sm">
                  {formStatus === 'sending' && (
                    <span className="text-cyan-400 animate-pulse">Sending message...</span>
                  )}
                  {formStatus === 'success' && (
                    <span className="text-green-400 font-semibold">✅ Message sent successfully! I'll get back to you soon.</span>
                  )}
                  {formStatus === 'error' && (
                    <span className="text-red-400 font-semibold">❌ Failed to send message. Please try again or email me directly.</span>
                  )}
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200">Email</h4>
                    <p className="text-gray-400">umerkhan0207@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200">Phone</h4>
                    <p className="text-gray-400">+91 8830941742</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200">Location</h4>
                    <p className="text-gray-400">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-gray-200 mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/umerkhan-g-36186529a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                    <span className="text-white text-lg">💼</span>
                  </a>
                  <a href="https://github.com/UmerkhanGolandaz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-gray-500/50 transition-all">
                    <span className="text-white text-lg">🐙</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
        <motion.footer 
          className="bg-gradient-to-r from-slate-500/20 via-blue-500/20 to-gray-500/20 backdrop-blur-lg border-t border-slate-400/30 py-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
        <div className="max-w-7xl mx-auto text-center">
              <p className="text-transparent bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text font-semibold">
              © 2024 Umerkhan Golandaz. Made with ❤️ and cutting-edge technology.
            </p>
        </div>
        </motion.footer>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioApp />
  </React.StrictMode>,
)

