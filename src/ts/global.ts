export function showMenu(entries: IntersectionObserverEntry[]){
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

export function stringSlicer(s: string, char: string): string{
  let end: number = 0;
  for(let i: number = 0; i < s.length; ++i){
    if(s[i] === char){
      end = i;
    }
  }

  return s.slice(0, end - 1);
}

export function clearHightlightedButtons(): void{
  const buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("menu-buttons");
  for(let i: number = 0; i < buttons.length; ++i){
    buttons[i].classList.remove("menu-style-btn");
  }
}

export function highlightMenu(entries: IntersectionObserverEntry[]){
  entries.forEach((entry: IntersectionObserverEntry)=>{
    if(entry.isIntersecting && entry.target.id !== "welcome-section"){
      clearHightlightedButtons();
      const button: Element | null | undefined = buttonFinder(stringSlicer(entry.target.id, '-'));
      button!.classList.add("menu-style-btn");
    }
  });
}