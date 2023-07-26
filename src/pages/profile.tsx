import {useEffect} from 'react';
import '../css/profile.css';
import {showMenu, highlightMenu, stringSlicer} from '../ts/global';
import {skills} from '../ts/about';
import {projects} from '../ts/projects';
import ParticlesComponent from '../components/particles';

function Welcome(){
  return(
    <section id="welcome-section" className="sections">
      <p>Welcome, I'm <span style={{color: "rgba(52, 69, 161, 1)"}}>Marvin</span>.</p>
      <p>I'm a full stack web developer.</p>
      <button onClick={()=>{document.getElementById("projects-section")!.scrollIntoView({
      behavior: "smooth"
    });}}>View Work &#8675;</button>
    </section>
  );
}

function SectionTitle(props:{content: string}){
  return(
    <h1 className="section-title"><span style={{color: "rgba(52, 69, 161, 1)"}}>&#60;</span>{props.content}<span style={{color: "rgba(52, 69, 161, 1)"}}>/&#62;</span></h1>
  );
}

function Menu(){
  function navigateToSection(e: React.MouseEvent):void{
    const currentElement: string = stringSlicer(e.currentTarget.id, '-');
    console.log(currentElement);
    document.getElementById(`${currentElement}-section`)!.scrollIntoView({
      behavior: "smooth"
    });
  }

  return(
    <header id="menu">
      <button id="about-button" className="menu-buttons" onClick={navigateToSection}>About</button>
      <button id="projects-button" className="menu-buttons" onClick={navigateToSection}>Projects</button>
      <button id="contacts-button" className="menu-buttons" onClick={navigateToSection}><a href="mailto:marvin.altidor@outlook.com" title='mail'>Contact</a></button>
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
            <div className={index % 2 === 0 ? "project-container-left" : "project-container-right"}>
              <div className="project-wrappers">
                <img src={project.img} alt="Project" />
                <div className={index % 2 === 0 ? "project-description-left" : "project-description-right"}>
                  <h2>{project.name}</h2>
                  <div className="project-links-bg"><a href={project.link} target="_blank">Live</a></div>
                  <div className="project-links-bg"><a href={project.code} target="_blank">Code</a></div>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer(){
  const contacts: {img: string, link: string}[] = [
    {img: "./assets/github-light-64px.png", link: "https://github.com/MtheMartian"},
    {img: "./assets/twitter-blue.png", link: "https://twitter.com/MtheMartian_"},
    {img: "./assets/lin.png", link: "https://www.linkedin.com/in/marvin-altidor-419b60249/"}
  ];

  return(
    <footer id="contacts-section">
      <div>
        <div>^</div>
        <div>^</div>
        <div>^</div>
      </div>
      <div id="contacts-wrapper">
      {contacts.map((contact, index)=>
        <a href={contact.link} title="contact" key={`contact-key${index}`} target="_blank">
          <img src={contact.img} alt="contact" />
        </a>
      )}
      </div>
      <span>Marvin Altidor&reg;</span>
    </footer>
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
    let observer: IntersectionObserver = new IntersectionObserver(highlightMenu, {threshold: 0.2});
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
      <ParticlesComponent />
      <Welcome />
      <Menu />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}