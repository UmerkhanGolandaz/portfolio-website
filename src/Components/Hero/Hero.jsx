import React from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.svg';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  // Function to handle opening the PDF file
  

  const openResume = () => {
    // Correct the path to your PDF file with the proper relative or absolute path
    window.open('/src/assets/resume-example.pdf', '_blank');
  };
  

  return (
    <div id='home' className='hero'>
      <img src={profile_img} alt="" className='profile-img' />
      <h1><span>I'm Aryan Budukh,</span> Machine Learning intern based in INDIA.</h1>
      <p>I am a SY B.Tech Student from Vishwakarma University, Pune with experience in ML, DL, Python, and web development.</p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink>
        </div>
        <div className="hero-resume" onClick={openResume}>My resume</div>
      </div>
    </div>
  );
};

export default Hero;
