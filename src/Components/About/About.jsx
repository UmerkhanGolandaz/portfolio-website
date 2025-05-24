import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/about_profile.svg'


const About = () => {
  return (
    <div id='about' className='about'>
      <div className="title-box">
        <h1>About me</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="about-sections">
        <div className="about-left">
            <img src={profile_img} alt="" />
        </div>
        <div className="about-right">
            <div className="about-para">
                <p>As a tech-savvy student with a passion for programming, I possess a strong skill set in Python,C,C++ and Web development. With my programming knowledge, I am also able to automate tasks, and analyze data. Additionally, I have a keen interest in technology, constantly seeking out new cutting edge technologies and programming languages to further advance my skills. My experience in machine learning and AI using IBM Watson has allowed me to expand my skill set even further, and I am excited to continue learning and growing in this field.</p>
                <p>My passion for Machine learning is not only reflected in my Projects and certifications but also in the enthusiasm and dedication I bring to each project.</p>
            </div>
            <div className="about-skills">
                <div className="about-skill"><p>Web Dev</p><hr style={{width:"60%"}} /></div>
                <div className="about-skill"><p>  ML,DL</p><hr style={{width:"80%"}} /></div>
                <div className="about-skill"><p> Python</p><hr style={{width:"90%"}} /></div>
                <div className="about-skill"><p> C,C++ </p><hr style={{width:"60%"}} /></div>
            </div>
        </div>
      </div>
      <div className="about-achievements">
        <div className="about-achievement">
            <h1>5+</h1>
            <p>
              Machine learning <br />
              projects Completed  

            </p>
        </div>
        <hr />
        <div className="about-achievement">
            <h1>11</h1>
            <p>TOTAL PROJECTS <br />COMPLETED <br />
          
            </p>
        </div>
        <hr />
    
        <div className="about-achievement">
            <h1>2</h1>
            <p>Research Papers published <br />in ICICCT (SPRINGER) <br />
          
            </p>
        </div>
        <hr />


        <div className="about-achievement">
            <h1>16</h1>
            <p>Licences and certifications <br /> in  Python , AI with IBM watson <br /> and ML   <br />
              
            </p>
        </div>
      </div>
    </div>
  )
}

export default About
