import React, {MouseEventHandler, useEffect, useState, useRef} from 'react';
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

import OpRealm from '../assets/projects-images/oprealm.jpg';
import War from '../assets/projects-images/war.jpg';

interface GeneralProps {
  fillBorderOnClick: MouseEventHandler,
}

function SideMenu({fillBorderOnClick} : GeneralProps){
  useEffect(()=>{
    $(".anchors").on("click", (e)=>{
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
          <a href="#about-me" className="side-menu-anchors anchors" onClick={fillBorderOnClick}>WELCOME</a>
        </li>
        <li>
          <a href="#skills" className="side-menu-anchors anchors" onClick={fillBorderOnClick}>SKILLS</a>
        </li>
        <li>
          <a href="#projects" className="side-menu-anchors anchors" onClick={fillBorderOnClick}>PROJECTS</a>
        </li>
        <li>
          <a href="#contact-me" className="side-menu-anchors anchors" onClick={fillBorderOnClick}>GET IN TOUCH</a>
        </li>
      </ul>
    </nav>
  );
}

function AboutMe(){
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
        <button id="work-button" className="buttons">
          <a href="#projects" className="anchors">View Work</a>
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
        <h2 id="skills-title" className="section-titles">Skills</h2>
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
  const [projectPages, setProjectPages] = useState<JSX.Element[]>([<div>Loading...</div>]);
  const pageAnchors = useRef<number | null>(null);
  const pageCounter = useRef<number | null>(null);

  const leftButton = useRef<HTMLDivElement | null>(null);
  const rightButton = useRef<HTMLDivElement | null>(null);

  useEffect(() =>{
    const projects: {name: string, link: string, github: string, ss: string}[] = [
      {name: "GameSun", link: "", github: "https://github.com/MtheMartian/gamestar", ss: OpRealm},
      {name: "One Piece Realm", link: "https://oprealm.herokuapp.com/", github: "https://github.com/MtheMartian/onepieceuniverse", ss: OpRealm},
      {name: "War!", link: "https://mthemartian.github.io/short-war/", github:"https://github.com/MtheMartian/short-war", ss: OpRealm},
      {name: "APOD NASA", link: "https://mthemartian.github.io/apod-space/", github:"https://github.com/MtheMartian/apod-space", ss: OpRealm}];
    
    pageAnchors.current = 1;

    leftButton.current!.classList.add("hidden");

    function CreateProjectPages(): JSX.Element[]{
      let numOfPages: number = Math.floor(projects.length / 3);
      if(projects.length % 3 !== 0){
        numOfPages = numOfPages + 1;
      }

      pageCounter.current = numOfPages;

      let tempIndex: number = 1;
      let increment: number = 0;

      let pages: JSX.Element[] = [<div></div>];
      let allProjects: JSX.Element[] = [<div></div>];

      for(let i: number = 0; i < projects.length; i++){
        allProjects.push(
          <div className="project-container" key={"project" + i}>
            <div className='project-image-container'>
              <img src={projects[i].ss} alt="Project" />
            </div>
            <div className="project-description">
              <h1>{projects[i].name}</h1>
              <div>
                <button><a href={projects[i].link}>Live</a></button>
                <button><a href={projects[i].github}>Code</a></button>
              </div>
            </div>
          </div>
        )
      }

      for(let i: number = 1; i <= numOfPages; i++){
        pages.push(
        <div id={"project-page-" + i} className="project-pages" key={"page" + i}>
            {(function(): JSX.Element[]{
              let currentProjects: JSX.Element[] = [];
              for(let j: number = tempIndex; j < allProjects.length; j++){
                if(increment === 2){
                  tempIndex = tempIndex + increment;
                  increment = 0;
                  break;
                }
                currentProjects.push(allProjects[j]);
                increment++;
              }
              return currentProjects;
            })()}
        </div>
        );
      }

      return pages;
    }

    setProjectPages(prev => prev = CreateProjectPages());
  }, []);

  useEffect(() =>{
    $(".project-page-buttons-wrapper").on('click', (e: any) =>{
      e.preventDefault();
      const buttons: Element = e.currentTarget;
      let previous: string | null = "";
      let next: string | null = "";
  
      if(buttons.id.includes("left")){
        if(pageCounter.current! > 1){
          pageAnchors.current!--;
          previous = "#project-page-" + pageAnchors.current;
          $("#project-pages-wrapper").animate({scrollLeft: $(previous).offset()?.left}, 800);
        }
      }
      else if(buttons.id.includes("right")){
        if(pageAnchors.current! < pageCounter.current!){
          pageAnchors.current!++;
          next = "#project-page-" + pageAnchors.current;
          $("#project-pages-wrapper").animate({scrollLeft: $(next).offset()?.top}, 800);
        }
      }
  
      if(pageAnchors.current! <= 1){
        leftButton.current?.classList.add("hidden");
      }
      else{
        leftButton.current?.classList.remove("hidden");
      }
    
      if(pageCounter.current === 1 || pageAnchors.current === pageCounter.current){
        rightButton.current?.classList.add("hidden");
      }
      else{
        rightButton.current?.classList.remove("hidden");
      }
    })

    return ()=>{
      $(".project-page-buttons-wrapper").off();
    }
  }, []) 

  return(
    <section id="projects" className="portfolio-section-general">
      <h2 id="projects-title">Projects</h2>
      <div id="project-pages-wrapper-style">
        <div id="project-page-left-wrapper" className="project-page-buttons-wrapper" ref={leftButton}>
          <button id="project-page-left" className="project-page-buttons">
          </button>
        </div>
        <div id="project-page-right-wrapper" className="project-page-buttons-wrapper" ref={rightButton}>
          <button id="project-page-right" className="project-page-buttons">
          </button>
        </div>
        <div id="project-pages-wrapper">
          {projectPages} 
        </div>
      </div>
    </section>
  );
}

function ContactMe(){
  return(
    <section id="contact-me" className="portfolio-section-general">
      <form id="contact-me-form" action="mailto:marvin.altidor@outlook.com" method="post" encType='text/plain'>
        <div id="contact-title">
          <h1>Get in touch</h1>
        </div>
        <div id="contact-inputs-section">
          <div id="contact-name-email-wrapper">
            <div className="contact-inputs-wrappers">
              <label htmlFor="contact-name">Name</label>
              <input type="text" name="name" className="contact-inputs" id="contact-name" />
            </div>
            <div className="contact-inputs-wrappers">
              <label htmlFor="contact-email">Email</label>
              <input type="text" name="email" className="contact-inputs" id="contact-email" />
            </div>
          </div>
          <div id="contact-message-wrapper">
            <div className="contact-inputs-wrappers">
              <label htmlFor="contact-message">Message</label>
              <textarea form="conatct-me-form" name="message" className="contact-inputs" id="contact-message"></textarea>
            </div>
          </div>
        </div>
        <input type="submit" value="Send Message" className="buttons" id="contact-submit"></input>
      </form>
    </section>
  );
}

export default function Profile(){
  // Observer 
  let options: {root: Element | null, rootMargin: string, threshold: number} = {
    root: document.querySelector("#profile-page"),
    rootMargin: "0px",
    threshold: 0.3,
  }

  let observer : IntersectionObserver = new IntersectionObserver(() =>{console.log("poop")}, options);

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
      <AboutMe />
      <Skills />
      <Projects />
      <ContactMe />
    </div>
  );
}