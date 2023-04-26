import React, {MouseEventHandler, useEffect, useState} from 'react';
import '../css/profile.css';
import Twitter from '../assets/twitter-blue.png';
import GitHub from '../assets/github-dark-64px.png';
import LinkedIn from '../assets/lin.png';
import CSharp from '../assets/tool-logo/c-sharp-c-seeklogo.com.svg';
import JavaScript from '../assets/tool-logo/javascript-js-seeklogo.com.svg';
import Node from '../assets/tool-logo/nodejs-seeklogo.com.svg';
import ReactJS from '../assets/tool-logo/react-seeklogo.com.svg';
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
  const tools: {name: string, image: string}[] = [{name: "C#",image: CSharp}, {name: "JavaScript",image: JavaScript},
  {name: "React",image: ReactJS}, {name: "EJS",image: ""}, {name: "NodeJS",image: Node}];

  const links : string[] = [GitHub, LinkedIn, Twitter];

  const [displayLinks, setDisplayLinks] = useState<boolean>(false);

  useEffect(() =>{
    const linksTimer: NodeJS.Timer = setTimeout(() =>{
      setDisplayLinks(prev => prev = true);
    }, 2000);

    return () =>{
      clearInterval(linksTimer);
    }
  });

  return(
    <section id="about-me" className="portfolio-section-general">
      <div id="olo">
        <div id="title-name-links">
          <div id="name-wrapper">
            <h2 id="name">Marvin Altidor</h2>
            {displayLinks ? <div id="links-wrapper">
            {links.map((link: string, index: number) => 
              <img alt="link" src={link} className="link-img"/>
            )}
            </div> : null}
          </div>
          <h1 id="what-am-i">Web Developer</h1>
        </div>
        <p>I'm a Full Stack developper and I bring ideas to life.</p>
        <p>Tools used to make this happen:</p>
        <ul id="tools-wrapper">
          {tools.map((tool: {name: string, image: string}, index: number) =>
          <li key={index} className="tool">
            <img alt="tool" src={tool.image} className="tool-img"/>
            <span className="tool-tooltip">{tool.name}</span>
          </li>
          )}
        </ul>
          <a href="#projects" className="side-menu-anchors" onClick={fillBorderOnClick}>PROJECTS</a>
      </div>
    </section>
  );
}

function Projects(){

  const projects: string[] = ["GameStar(GameSun)", "OnePieceUniverse", "WAR! (Card Game)"]
  return(
    <section id="projects" className="portfolio-section-general">
        {projects.map((project: string, index: number) =>
            <div key={index}>
              
            </div>
        )}
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
      <SideMenu fillBorderOnClick={fillBorderOnClick}/>
      <AboutMe fillBorderOnClick={fillBorderOnClick}/>
      <Projects />
      <ContactMe />
    </div>
  );
}