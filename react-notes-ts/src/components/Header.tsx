import { useState ,useEffect } from "react";
import light from '../icons/icons8-sun-30.png'
import dark from '../icons/icons8-moon-symbol-30.png'

function Header() {
  const [theme, setTheme]= useState( window.localStorage.getItem('theme')) 
  console.log('start', theme)
 function handleTheme(){
  setTheme((prevTheme) => {
    return prevTheme === "dark" ? "light" : "dark";
  })}
  useEffect(()=>{
    if(theme==="dark"){
      document.querySelector('html')?.setAttribute('data-bs-theme', 'dark');
      window.localStorage.setItem('theme', 'dark')
    }else{
      document.querySelector('html')?.setAttribute('data-bs-theme', 'light');
      window.localStorage.setItem('theme', 'light')
    }
  },[theme])
  return (
    <header>
      <h1>Keeper</h1>
      <button onClick={handleTheme}><img src={theme!=="dark"? dark : light} alt=""  height={"30px"} width={"30px"} /></button>
    </header>
  );
}

export default Header;