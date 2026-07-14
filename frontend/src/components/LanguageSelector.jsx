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
  { code: "hi", label: "HI", name: "हिन्दी" },
];


function changeGoogleLanguage(language) {

  const googleLanguage =
    language === "en"
      ? "/en/en"
      : `/en/${language}`;


  // Define idioma no Google Translate
  document.cookie =
    `googtrans=${googleLanguage}; path=/; SameSite=Lax`;


  // Salva preferência do usuário
  localStorage.setItem(
    LANGUAGE_STORAGE_KEY,
    language
  );


  // Recarrega para aplicar tradução
  window.location.reload();
}



export default function LanguageSelector({
  className = ""
}) {

  const [activeLanguage, setActiveLanguage] =
    useState(() => {

      return (
        localStorage.getItem(
          LANGUAGE_STORAGE_KEY
        ) || "en"
      );

    });


  const [open, setOpen] =
    useState(false);


  const ref =
    useRef(null);



  useEffect(() => {

    function close(event) {

      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setOpen(false);
      }

    }


    document.addEventListener(
      "mousedown",
      close
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        close
      );

    };


  }, []);



  return (

    <div
      ref={ref}
      className={`relative ${className}`}
    >


      <button

        type="button"

        onClick={() => setOpen(!open)}

        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          px-3
          py-2
          bg-white
          shadow
        "

      >

        <Languages size={18} />


        {
          languages.find(
            language =>
              language.code === activeLanguage
          )?.label
        }


        <ChevronDown size={16} />

      </button>



      {
        open && (

          <div

            className="
              absolute
              right-0
              mt-2
              w-48
              rounded-xl
              border
              bg-white
              shadow-xl
              z-50
              overflow-hidden
            "

          >


            {
              languages.map(language => (

                <button

                  key={language.code}

                  type="button"


                  onClick={() => {

                    setActiveLanguage(
                      language.code
                    );

                    setOpen(false);

                    changeGoogleLanguage(
                      language.code
                    );

                  }}


                  className={`
                    w-full
                    flex
                    justify-between
                    px-4
                    py-3
                    text-sm

                    ${
                      activeLanguage === language.code
                        ?
                        "bg-teal-100"
                        :
                        "hover:bg-gray-100"
                    }
                  `}

                >

                  <span>
                    {language.name}
                  </span>


                  <span>
                    {language.label}
                  </span>


                </button>

              ))
            }


          </div>

        )
      }



    </div>

  );

}