import React, {useEffect, useState, useRef} from 'react';
import '../css/profile.css';
import Twitter from '../assets/twitter-blue.png';
import GitHub from '../assets/github-dark-64px.png';
import LinkedIn from '../assets/lin.png';
import Mail from '../assets/mail-48px.png';
import CSharp from '../assets/tool-logo/c-sharp.svg';
import JavaScript from '../assets/tool-logo/js.svg';
import Node from '../assets/tool-logo/nodejs.svg';
import ReactJS from '../assets/tool-logo/react.svg';
import HTML from '../assets/tool-logo/html5.svg';
import CSS from '../assets/tool-logo/css3.svg';
import $ from 'jquery';

import OpRealm from '../assets/projects-images/oprealm.jpg';
import War from '../assets/projects-images/war.jpg';
import Nasa from '../assets/projects-images/nasa-apod.jpg';
import GameSun from '../assets/projects-images/gamesun.jpg';

function SideMenu(){
  return(
    <nav id="side-menu-wrapper">
      <ul id="side-menu">
        <li>
          <a href="#about-me" className="side-menu-anchors anchors">WELCOME</a>
        </li>
        <li>
          <a href="#skills" className="side-menu-anchors anchors">SKILLS</a>
        </li>
        <li>
          <a href="#projects" className="side-menu-anchors anchors">PROJECTS</a>
        </li>
        <li>
          <a href="#contact-me" className="side-menu-anchors anchors">GET IN TOUCH</a>
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
  const [projectPages, setProjectPages] = useState<JSX.Element[] | JSX.Element>(<div>Loading...</div>);
  const pageAnchors = useRef<number | null>(null);
  const pageCounter = useRef<number | null>(null);

  const leftButton = useRef<HTMLDivElement | null>(null);
  const rightButton = useRef<HTMLDivElement | null>(null);

  useEffect(() =>{
    const projects: {name: string, link: string, github: string, ss: string}[] = [
      {name: "GameSun", link: "", github: "https://github.com/MtheMartian/gamestar", ss: GameSun},
      {name: "One Piece Realm", link: "https://oprealm.herokuapp.com/", github: "https://github.com/MtheMartian/onepieceuniverse", ss: OpRealm},
      {name: "War!", link: "https://mthemartian.github.io/short-war/", github:"https://github.com/MtheMartian/short-war", ss: War},
      {name: "APOD NASA", link: "https://mthemartian.github.io/apod-space/", github:"https://github.com/MtheMartian/apod-space", ss: Nasa}];
    
    pageAnchors.current = 1;

    leftButton.current!.classList.add("hidden");

    function CreateProjectPages(): JSX.Element[]{
      let numOfPages: number = Math.floor(projects.length / 2);
      if(projects.length % 2 !== 0){
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
              <h2>{projects[i].name}</h2>
              <div className="project-buttons">
                <button><a href={projects[i].link} target="_blank" rel="noreferrer noopener">Live</a></button>
                <button><a href={projects[i].github} target="_blank" rel="noreferrer noopener">Code</a></button>
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

    return ()=>{
      setProjectPages(prev => prev = <div>Loading...</div>);
    }
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
          $("#project-pages-wrapper").animate({scrollLeft: "-=" + $(previous).outerWidth()}, 800);
        }
      }
      else if(buttons.id.includes("right")){
        if(pageAnchors.current! < pageCounter.current!){
          pageAnchors.current!++;
          next = "#project-page-" + pageAnchors.current;
          $("#project-pages-wrapper").animate({scrollLeft: "+=" + $(next).outerWidth()}, 800);
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
      <div id="projects-wrapper">
        <h2 id="projects-title" className="section-titles">Projects <span>&#40;most recent to least&#41;</span></h2>
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
      </div>
    </section>
  );
}

function ContactMe(){
   // Links variable
   const links : {linkImage: string, link: string}[] = [{linkImage: GitHub, link: "https://github.com/MtheMartian"},
   {linkImage: LinkedIn, link: "https://www.linkedin.com/in/marvin-altidor-419b60249/"}, {linkImage: Twitter, link: "https://twitter.com/MtheMartian_"}];

  return(
    <section id="contact-me" className="portfolio-section-general">
      <div id="contact-me-wrapper">
        <div id="contact-title">
            <h1>Get in touch</h1>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div id="links-wrapper">
          {links.map((link: {linkImage: string, link: string}, index: number) => 
            <a key={index} href={link.link} target="_blank" rel="noreferrer noopener" className="link-anchor">
              <img alt="link" src={link.linkImage} className="link-img"/>
            </a>
          )}
          <form id="contact-me-form" action="mailto:marvin.altidor@outlook.com" method="post" encType='text/plain'>
            <button type="submit" value="Send Message" id="contact-submit" className="link-anchor">
              <img src={Mail} className="link-img"/>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Profile(){
  // Observer Functions
  function fillBorderOnScroll(entries: IntersectionObserverEntry[]){
    const anchors : HTMLAnchorElement[] = 
            Array.from(document.getElementsByClassName("side-menu-anchors") as HTMLCollectionOf<HTMLAnchorElement>);
  
    entries.forEach((entry: IntersectionObserverEntry) =>{
        if(entry.isIntersecting){
          anchors.forEach((anchor: HTMLAnchorElement) =>{
            if("#" + entry.target.id === anchor.getAttribute("href")){
              console.log(entry.target.id);
              anchor.parentElement!.style.animation = "fillborder 3s infinite ease-in";
              anchor.style.opacity = "1";
            }
            else{
              anchor.parentElement!.style.animation = "none";
              anchor.style.cssText = "";
            }
          })
        }
    });
  }

  useEffect(()=>{
    let observer : IntersectionObserver = new IntersectionObserver(fillBorderOnScroll, {threshold: 0.5});

    const pageSections: HTMLElement[] = Array.from(document.querySelectorAll("section"));

    pageSections.forEach(element =>{
      observer.observe(element);
    });


    return() =>{
      observer.disconnect();
    }
  });

  useEffect(()=>{
    $(".anchors").on("click", (e)=>{
      e.preventDefault();
      const href: string | null = e.currentTarget.getAttribute("href");
  
      $("body, html").animate({scrollTop: $(href!).offset()?.top}, 500);
    });

    return () =>{
      $(".anchors").off();
    }
  }, []);

  return(
    <div id="profile-page">
      <SideMenu />
      <AboutMe />
      <Skills />
      <Projects />
      <ContactMe />
    </div>
  );
}