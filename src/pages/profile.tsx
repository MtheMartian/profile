import {useEffect} from 'react';
import '../css/profile.css';
import {showMenu, highlightMenu} from '../ts/global';
import {skills} from '../ts/about';
import {projects} from '../ts/projects';

function Welcome(){
  return(
    <section id="welcome-section" className="sections">
      <p>Welcome, I'm <span style={{color: "gold"}}>Marvin</span>.</p>
      <p>I'm a full stack web developer.</p>
      <button>View Work &#8675;</button>
    </section>
  );
}

function SectionTitle(props:{content: string}){
  return(
    <h1 className="section-title"><span style={{color: "gold"}}>&#60;</span>{props.content}<span style={{color: "gold"}}>/&#62;</span></h1>
  );
}

function Menu(){
  return(
    <header id="menu">
      <button id="about-button" className="menu-buttons">About</button>
      <button id="projects-button" className="menu-buttons">Projects</button>
      <button id="contact-button" className="menu-buttons">Contact</button>
    </header>
  );
}

function About(){
  function tools(): JSX.Element[]{
    return(
      skills.map((skill, index)=>
      <div className="tool-border" key={`tool${index}`}>
        <div className="tool">
          <img src={skill.img} alt="Tool" />
          <span>{skill.name}</span>
        </div>
      </div>
      )
    )
  }

  function toolGrids(): JSX.Element[]{
    const numOfGrids: number = Math.floor(skills.length / 3);
    let toolsContainers: JSX.Element[] = [];
    const allTools: JSX.Element[] = tools();
    let currentIndex: number = 0;

    for(let i: number = 1; i <= numOfGrids; ++i){
      toolsContainers.push(
        <div className="tools-wrapper" key={`tools${i}`}>
          {(function(): JSX.Element[]{
            let tempArr: JSX.Element[] = [];
            for(let j: number = 0; j < (i % 2 === 0 ? 4 : 3); ++j){
              tempArr.push(allTools[currentIndex]);
              ++currentIndex;
            }
            return tempArr;
          })()}
        </div>
      )
    }

    return toolsContainers;
    
  }

  return(
    <section id="about-section" className="sections">
      <SectionTitle content="About" />
      <div id="about-section-content">
        <div id="about-section-me">
          <div id="about-section-picture-border">
            <img src={"./assets/test.png"} alt="Silhouette" />
          </div>
          <p>
            Someone who spent too much time on the computer, 
            found out what coding was and been intrigued ever since.
          </p>
        </div>
        <div id="tools">
          {toolGrids()}
        </div>
      </div>
    </section>
  );
}

function Projects(){
  return(
    <section id="projects-section" className="sections">
      <SectionTitle content="Projects" />
      <div id="projects">
        <div id="projects-wrapper">
          {projects.map((project, index)=>
            <div className="project-wrappers">
              <img src={project.img} alt="Project" />
              <div className="project-description">
                <h2>{project.name}</h2>
                <a href={project.link}>Live</a>
                <a href={project.code}>Code</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio(){
  // Show Menu
  useEffect(()=>{
    let observer: IntersectionObserver = new IntersectionObserver(showMenu, {threshold: 0.45});
    observer.observe(document.getElementById("welcome-section")!);

    return()=>{
      observer.disconnect();
    }
  })

  // Highlight Menu Items
  useEffect(()=>{
    let observer: IntersectionObserver = new IntersectionObserver(highlightMenu, {threshold: 0.5});
    const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("sections");

    for(let i: number = 0; i < elements.length; ++i){
      observer.observe(elements[i]);
    }

    return()=>{
      observer.disconnect();
    }
  })

  return(
    <main id="portfolio">
      <Welcome />
      <Menu />
      <About />
      <Projects />
    </main>
  );
}