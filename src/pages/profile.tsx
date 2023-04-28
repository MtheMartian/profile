import React, {MouseEventHandler, useEffect} from 'react';
import '../css/profile.css';
import Twitter from '../assets/twitter-blue.png';
import GitHub from '../assets/github-dark-64px.png';
import LinkedIn from '../assets/lin.png';
import CSharp from '../assets/tool-logo/c-sharp-c-seeklogo.com.svg';
import JavaScript from '../assets/tool-logo/javascript-js-seeklogo.com.svg';
import Node from '../assets/tool-logo/nodejs-seeklogo.com.svg';
import ReactJS from '../assets/tool-logo/react-seeklogo.com.svg';
import HTML from '../assets/tool-logo/html5-with-wordmark-color.svg';
import CSS from '../assets/tool-logo/css-3-seeklogo.com.svg';
import $ from 'jquery';

interface GeneralProps {
  fillBorderOnClick: MouseEventHandler,
}

function SideMenu({fillBorderOnClick} : GeneralProps){
  useEffect(()=>{
    $(".side-menu-anchors").on("click", (e)=>{
      e.preventDefault();
      const href: string | null = e.currentTarget.getAttribute("href");
  
      $("html, body").animate({scrollTop: $(href!).offset()?.top}, 500);
    });

    return () =>{
      $("#side-menu li a").off();
    }
  }, []);

  return(
    <nav id="side-menu-wrapper">
      <ul id="side-menu">
        <li>
          <a href="#about-me" className="side-menu-anchors" onClick={fillBorderOnClick}>WELCOME</a>
        </li>
        <li>
          <a href="#skills" className="side-menu-anchors" onClick={fillBorderOnClick}>SKILLS</a>
        </li>
        <li>
          <a href="#projects" className="side-menu-anchors" onClick={fillBorderOnClick}>PROJECTS</a>
        </li>
        <li>
          <a href="#contact-me" className="side-menu-anchors" onClick={fillBorderOnClick}>GET IN TOUCH</a>
        </li>
      </ul>
    </nav>
  );
}

function AboutMe({fillBorderOnClick} : GeneralProps){
  return(
    <section id="about-me" className="portfolio-section-general">
      <div id="olo">
        <div id="title-name-links">
          <div id="name-wrapper">
            <h2 id="name">Marvin Altidor</h2>
          </div>
          <h1 id="what-am-i">Web Developer</h1>
        </div>
        <p id="about-me-paragraph">I'm a Full Stack developer and I bring ideas to life.</p>
        <button id="work-button">
          <a href="#projects" className="side-menu-anchors" onClick={fillBorderOnClick}>View Work</a>
        </button>
      </div>
    </section>
  );
}

function Skills(){
  const tools: {name: string, image: string}[] = [{name: "C#",image: CSharp}, {name: "JavaScript",image: JavaScript},
  {name: "React",image: ReactJS}, {name: "HTML",image: HTML}, {name: "CSS",image: CSS}, {name: "NodeJS",image: Node}];

  return(
    <section id="skills" className="portfolio-section-general">
      <ul id="tools-wrapper">
        <h2 id="skills-title">Skills</h2>
        {tools.map((tool: {name: string, image: string}, index: number) =>
        <li key={index} className="tool">
          <img alt="tool" src={tool.image} className="tool-img"/>
          <span className="tool-tooltip">{tool.name}</span>
        </li>
        )}
      </ul>
    </section>
  );
}

function Projects(){

  const projects: {name: string, desc: string, link: string, github: string, ss: string}[] = [
    {name: "GameSun", desc: "Search for upcoming or recent games", link: "", github: "https://github.com/MtheMartian/gamestar", ss: ""},
    {name: "One Piece Realm", desc: "Create, search and learn more about the One Piece universe!", link: "https://oprealm.herokuapp.com/", github: "https://github.com/MtheMartian/onepieceuniverse", ss: ""},
    {name: "War!", desc: "Classic card game where both players draw a card until no cards are left, player with the most cards wins!", link: "https://mthemartian.github.io/short-war/", github:"https://github.com/MtheMartian/short-war", ss: ""},
    {name: "APOD NASA", desc: "View daily pictures from space taken by NASA with a description of the phenomenon.", link: "https://mthemartian.github.io/apod-space/", github:"https://github.com/MtheMartian/apod-space", ss: ""}];
  return(
    <section id="projects" className="portfolio-section-general">
      <div id="projects-wrapper">
        {projects.map((project: {name: string, desc: string, link: string, github: string, ss: string}, index: number) =>
          <div key={index} className="project-container">
            <div className='project-image-container'>
              <img src={project.ss} alt="Project" />
              <span>{project.name}</span>
              <button><a href={project.link}>Live</a></button>
              <button><a href={project.github}>Code</a></button>
            </div>
            <div className="project-description">
              <p>{project.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ContactMe(){
  return(
    <section id="contact-me" className="portfolio-section-general">

    </section>
  );
}

export default function Profile(){
  // Links variable
  const links : {linkImage: string, link: string}[] = [{linkImage: GitHub, link: "https://github.com/MtheMartian"},
  {linkImage: LinkedIn, link: "https://www.linkedin.com/in/marvin-altidor-419b60249/"}, {linkImage: Twitter, link: "https://twitter.com/MtheMartian_"}];

  // General Functions
  function fillBorderOnClick(e : React.MouseEvent){
    const anchors : HTMLAnchorElement[] = 
            Array.from(document.getElementsByClassName("side-menu-anchors") as HTMLCollectionOf<HTMLAnchorElement>);

    anchors.forEach((anchor: HTMLAnchorElement) =>{
      if(e.currentTarget.getAttribute("href") === anchor.getAttribute("href")){
        anchor.parentElement!.style.animation = "fillborder 3s infinite ease-in";
        anchor.style.opacity = "1";
      }
      else{
        anchor.parentElement!.style.animation = "none";
        anchor.style.cssText = "";
      }
    })
  }

  return(
    <div id="profile-page">
      <div id="links-wrapper">
        {links.map((link: {linkImage: string, link: string}, index: number) => 
          <a key={index} href={link.link} target="_blank" rel="noreferrer noopener" className="link-anchor">
            <img alt="link" src={link.linkImage} className="link-img"/>
          </a>
        )}
      </div>
      <SideMenu fillBorderOnClick={fillBorderOnClick}/>
      <AboutMe fillBorderOnClick={fillBorderOnClick}/>
      <Skills />
      <Projects />
      <ContactMe />
    </div>
  );
}