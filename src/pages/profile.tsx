import {useEffect} from 'react';
import '../css/profile.css';

function Welcome(){
  return(
    <section id="welcome-section" className="sections">
      <p>Welcome, I'm <span style={{color: "gold"}}>Marvin</span>.</p>
      <p>I'm a full stack web developer.</p>
      <button>View Work &#8675;</button>
    </section>
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
  const skills: {name: string, img: string}[] = [
    {name: "JavaScript", img:"./assets/tool-logo/js.svg"},
    {name: "TypeScript", img:"./assets/tool-logo/typescript.svg"},
    {name: "HTML", img:"./assets/tool-logo/html5.svg"},
    {name: "CSS", img:"./assets/tool-logo/css3.svg"},
    {name: "NodeJS", img:"./assets/tool-logo/nodejs.svg"},
    {name: "C#", img:"./assets/tool-logo/c-sharp.svg"},
    {name: "MongoDB", img:"./assets/tool-logo/mongodb.svg"},
    {name: "ReactJS", img:"./assets/tool-logo/react.svg"},
    {name: "Docker", img:"./assets/tool-logo/docker.svg"}
  ];

  function skillGrids(){
    const numOfGrids: number = Math.floor(skills.length / 3);
  }

  function skillGrid(): JSX.Element[]{
    return(
      skills.map((skill, index)=>
        <div>
          
        </div>
      )
    )
  }

  return(
    <section id="about-section" className="sections">
      <h1 className="section-title">About</h1>
      <div>
      <p>
        Someone who spent too much time on the computer, 
        found out what coding was and been intrigued ever since.
      </p>
      <div>
        {skillGrid()}
      </div>
      </div>
    </section>
  );
}

export default function Portfolio(){
  function showMenu(entries: IntersectionObserverEntry[]){
    const menu: HTMLElement | null = document.getElementById("menu");

    entries.forEach((entry: IntersectionObserverEntry)=>{
      if(entry.isIntersecting){
        menu!.classList.remove("menu-style");
      }
      else{
        menu!.classList.add("menu-style");
      }
    })
  }

  function buttonFinder(currentSection: string): Element | null | undefined{
    const buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("menu-buttons");
    for(let i: number = 0; i < buttons.length; ++i){
      if(buttons[i].id.includes(currentSection)){
        return buttons[i];
      }
    }
  }

  function stringSlicer(s: string, char: string): string{
    let end: number = 0;
    for(let i: number = 0; i < s.length; ++i){
      if(s[i] === char){
        end = i;
      }
    }

    return s.slice(0, end - 1);
  }

  function clearHightlightedButtons(): void{
    const buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("menu-buttons");
    for(let i: number = 0; i < buttons.length; ++i){
      buttons[i].classList.remove("menu-style-btn");
    }
  }

  function highlightMenu(entries: IntersectionObserverEntry[]){
    const menu: HTMLElement | null = document.getElementById("menu");
    
    entries.forEach((entry: IntersectionObserverEntry)=>{
      if(entry.isIntersecting && entry.target.id !== "welcome-section"){
        clearHightlightedButtons();
        const button: Element | null | undefined = buttonFinder(stringSlicer(entry.target.id, '-'));
        button!.classList.add("menu-style-btn");
      }
    });
  }

  useEffect(()=>{
    let observer: IntersectionObserver = new IntersectionObserver(showMenu, {threshold: 0.45});
    observer.observe(document.getElementById("welcome-section")!);

    return()=>{
      observer.disconnect();
    }
  })

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
    </main>
  );
}