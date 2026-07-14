import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";

const LANGUAGE_STORAGE_KEY = "tourease_language";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "it", label: "IT", name: "Italiano" },
  { code: "ja", label: "JA", name: "日本語" },
  { code: "ko", label: "KO", name: "한국어" },
  { code: "zh-CN", label: "ZH", name: "中文" },
  { code: "hi", label: "HI", name: "Hindi" },
];


function setGoogTransCookie(language) {

  const value = language === "en"
    ? "/en/en"
    : `/en/${language}`;


  document.cookie =
    `googtrans=${value}; path=/`;

}


function applyLanguage(language){

  setGoogTransCookie(language);


  if(typeof window.doGTranslate === "function"){

    try{

      window.doGTranslate(
        language === "en"
          ? "en|en"
          : `en|${language}`
      );

      return;

    }catch(error){

      console.error(
        "Google Translate error:",
        error
      );

    }

  }


  const select =
    document.querySelector(".goog-te-combo");


  if(select){

    select.value = language;

    select.dispatchEvent(
      new Event("change")
    );

  }

}



export default function LanguageSelector({
  variant="floating",
  className=""
}){


const [
 activeLanguage,
 setActiveLanguage
]=useState(
 ()=>localStorage.getItem(
    LANGUAGE_STORAGE_KEY
 ) || "en"
);


const [
 isOpen,
 setIsOpen
]=useState(false);


const rootRef = useRef(null);


const isInline =
 variant==="inline";



useEffect(()=>{


 const saved =
 localStorage.getItem(
 LANGUAGE_STORAGE_KEY
 );


 if(saved){

   setActiveLanguage(saved);

   setTimeout(()=>{

      applyLanguage(saved);

   },1000);

 }


},[]);



useEffect(()=>{


 const closeMenu=(event)=>{

   if(
    rootRef.current &&
    !rootRef.current.contains(
      event.target
    )
   ){

     setIsOpen(false);

   }

 };


 document.addEventListener(
 "mousedown",
 closeMenu
 );


 return ()=>{

 document.removeEventListener(
 "mousedown",
 closeMenu
 );

 };


},[]);



function changeLanguage(language){


 setActiveLanguage(language);


 localStorage.setItem(
 LANGUAGE_STORAGE_KEY,
 language
 );


 applyLanguage(language);


 setIsOpen(false);


}



if(isInline){


return (

<div
ref={rootRef}
className={`relative ${className}`}
>


<button

type="button"

onClick={()=>
setIsOpen(!isOpen)
}

className="
flex items-center gap-2
rounded-lg border
px-3 py-2
bg-white
shadow
"

>

<Languages size={18}/>


{activeLanguage.toUpperCase()}


<ChevronDown size={16}/>


</button>



{
isOpen &&

<div
className="
absolute right-0
mt-2
w-40
rounded-lg
border
bg-white
shadow-lg
z-50
"
>


{
languages.map(lang=>(


<button

key={lang.code}

onClick={()=>
changeLanguage(lang.code)
}

className={`
w-full
flex
justify-between
px-3
py-2
text-sm

${
activeLanguage===lang.code
?
"bg-teal-100"
:
"hover:bg-gray-100"
}

`}

>

<span>
{lang.name}
</span>


<span>
{lang.label}
</span>


</button>


))
}


</div>


}



</div>


);


}



return (

<div
className="lang-fab-wrapper"
>


<Languages/>


{
languages.map(lang=>(


<button

key={lang.code}

onClick={()=>
changeLanguage(lang.code)
}

className={`
lang-fab-btn

${
activeLanguage===lang.code
?
"lang-fab-btn--active"
:
""
}

`}

>


{lang.label}


</button>


))
}



</div>


);


}