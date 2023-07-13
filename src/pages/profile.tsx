import React, {useEffect, useState, useRef} from 'react';
import $ from 'jquery';

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
  const tools: {name: string, image: string}[] = [{name: "C#",image: "/main/assets/tool-logo/c-sharp.svg"}, {name: "JavaScript",image: "/main/assets/tool-logo/js.svg"},
  {name: "React",image: "/main/assets/tool-logo/react.svg"}, {name: "HTML",image: "/main/assets/tool-logo/html5.svg"}, {name: "CSS",image: "/main/assets/tool-logo/css3.svg"}, {name: "NodeJS",image: "/main/assets/tool-logo/nodejs.svg"},
  {name: "MongoDB", image: "/main/assets/tool-logo/mongodb.svg"}, {name: "Docker", image: "/main/assets/tool-logo/docker.svg"}, {name: "TypeScript", image: "/main/assets/tool-logo/typescript.svg"}];

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
      {name: "GameAstral", link: "https://gameastral-057014ee9b02.herokuapp.com/", github: "https://github.com/MtheMartian/gamestar", ss: "/main/assets/projects-images/gamesun.jpg"},
      {name: "One Piece Realm", link: "https://oprealm.herokuapp.com/", github: "https://github.com/MtheMartian/onepieceuniverse", ss: "/main/assets/projects-images/oprealm.jpg"},
      {name: "War!", link: "https://mthemartian.github.io/short-war/", github:"https://github.com/MtheMartian/short-war", ss: "/main/assets/projects-images/war.jpg"},
      {name: "APOD NASA", link: "https://mthemartian.github.io/apod-space/", github:"https://github.com/MtheMartian/apod-space", ss: "/main/assets/projects-images/nasa-apod.jpg"}];
    
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
        <h2 id="projects-title" className="section-titles">Projects</h2>
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
   const links : {linkImage: string, link: string}[] = [{linkImage:  "/main/assets/github-light-64px.png", link: "https://github.com/MtheMartian"},
   {linkImage: "/main/assets/lin.png", link: "https://www.linkedin.com/in/marvin-altidor-419b60249/"}, {linkImage:  "/main/assets/twitter-blue.png", link: "https://twitter.com/MtheMartian_"}];

  return(
    <section id="contact-me" className="portfolio-section-general">
      <div id="contact-me-wrapper">
        <div id="contact-title">
            <h1>Get in touch</h1>
        </div>
        <div id="links-wrapper">
          {links.map((link: {linkImage: string, link: string}, index: number) => 
            <a key={index} href={link.link} target="_blank" rel="noreferrer noopener" className="link-anchor">
              <img alt="link" src={link.linkImage} className="link-img"/>
            </a>
          )}
          <a id="contact-submit" className="link-anchor" href="mailto:marvin.altidor@outlook.com">
            <img src= "/main/assets/mail-48px.png" className="link-img"/>
          </a>
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