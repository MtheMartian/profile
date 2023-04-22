import React, {useEffect} from 'react';
import '../css/profile.css';
import $ from 'jquery';

function SideMenu(){
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

  useEffect(()=>{
    $("#side-menu li a").on("click", (e)=>{
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

function AboutMe(){
  return(
    <section id="about-me" className="portfolio-section-general">
      <div id="olo">
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
      </div>
    </section>
  );
}

function Projects(){
  return(
    <section id="projects" className="portfolio-section-general">

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
  return(
    <div id="profile-page">
      <SideMenu />
      <AboutMe />
      <Projects />
      <ContactMe />
    </div>
  );
}