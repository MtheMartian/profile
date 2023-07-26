import {useEffect} from 'react';
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
            <img src={"./main/assets/test.png"} alt="Silhouette" />
          </div>
          <p>
            I'm someone who loves coding and got into it because of video games. Since I was young, I was fascinated by how games worked, the mechanics, and the immersive experiences they offered. I started exploring the code behind them, how characters came to life, and how gameplay was governed. As I delved deeper, I fell in love with coding's challenges and creativity. Today, coding has become my favorite hobby, where I turn ideas into digital creations. I find joy in the logical problem-solving aspect of it.
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
            <div className={index % 2 === 0 ? "project-container-left" : "project-container-right" } key={`project-key${index}`}>
              <div className="project-wrappers">
                <img src={project.img} alt="Project" />
                <div className={index % 2 === 0 ? "project-description-left" : "project-description-right"}>
                  <h2>{project.name}</h2>
                  <div className="project-links-bg"><a href={project.link} target="_blank" rel="noreferrer">Live</a></div>
                  <div className="project-links-bg"><a href={project.code} target="_blank" rel="noreferrer">Code</a></div>
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
    {img: "./main/assets/github-light-64px.png", link: "https://github.com/MtheMartian"},
    {img: "./main/assets/twitter-blue.png", link: "https://twitter.com/MtheMartian_"},
    {img: "./main/assets/lin.png", link: "https://www.linkedin.com/in/marvin-altidor-419b60249/"}
  ];

  return(
    <footer id="contacts-section">
      <button id="return-top" onClick={()=>{
        document.getElementById("welcome-section")!.scrollIntoView({behavior: "smooth"});
      }}>
        <div>^</div>
        <div>^</div>
        <div>^</div>
      </button>
      <div id="contacts-wrapper">
      {contacts.map((contact, index)=>
        <a href={contact.link} title="contact" key={`contact-key${index}`} target="_blank" rel="noreferrer">
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
    let observer: IntersectionObserver = new IntersectionObserver(highlightMenu, {threshold: 0.21});
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