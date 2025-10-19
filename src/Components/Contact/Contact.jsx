import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission - Replace with actual form handling
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      value: 'umer.khan@email.com',
      link: 'mailto:umer.khan@email.com',
    },
    {
      icon: HiPhone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'Your City, Country',
      link: '#',
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: '#333' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0077B5' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: '#E4405F' },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary-500/5 to-transparent"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Let's Talk
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center p-4 glass-strong rounded-xl border border-white/10 hover:border-primary-500/50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{info.title}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-gray-400 mb-4">Connect with me:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-12 h-12 glass rounded-lg flex items-center justify-center border border-white/10 hover:border-primary-500 transition-all group"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon className="text-gray-400 group-hover:text-primary-400 transition-colors" size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-primary-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-primary-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-primary-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 focus:border-primary-500 focus:outline-none transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

