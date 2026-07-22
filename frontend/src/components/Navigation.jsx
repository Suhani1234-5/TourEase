            import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  Sun,
  Moon,
  Globe,
  MapPin
} from "lucide-react";

import { useFavorites } from "../hooks/useFavorites";
import { useTheme } from "../context/useTheme";
import LanguageSelector from "./LanguageSelector";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const { favoriteIds } = useFavorites();

  const isLoggedIn = !!localStorage.getItem("token");


  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/destinations", label: "Explore" },
    { path: "/contact", label: "Contact" },
    { path: "/trip-planner", label: "Trip Planner" },
    { path: "/smart-trip-planner", label: "Smart Planner" },
    { path: "/split-expense", label: "Expense Splitter" },
    { path: "/travel-locker", label: "Travel Locker" },
    { path: "/currency-converter", label: "Currency" }
  ];


  const isActive = (path) => location.pathname === path;


  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true
    });
  };


  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity:0;
            }
            to {
              transform:translateX(0);
              opacity:1;
            }
          }

          @keyframes slideOutRight {
            from {
              transform:translateX(0);
              opacity:1;
            }
            to {
              transform:translateX(100%);
              opacity:0;
            }
          }

          @keyframes fadeIn {
            from {
              opacity:0;
            }
            to {
              opacity:1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity:1;
            }
            to {
              opacity:0;
            }
          }


          .menu-open {
            animation: slideInRight .4s ease forwards;
          }


          .menu-close {
            animation: slideOutRight .4s ease forwards;
          }


          .backdrop-open {
            animation: fadeIn .3s ease forwards;
          }


          .backdrop-close {
            animation: fadeOut .3s ease forwards;
          }
        `}
      </style>


      <nav className="
        fixed top-0 left-0 right-0 z-50
        bg-white dark:bg-gray-950
        border-b border-gray-200 dark:border-gray-800
        shadow-md
      ">


        <div className="
          w-full
          px-[clamp(16px,2vw,48px)]
        ">


          <div className="
            flex
            h-20
            items-center
            justify-between
          ">


            {/* LOGO */}

            <div
              onClick={handleLogoClick}
              className="
                cursor-pointer
                flex
                items-center
                gap-2
                shrink-0
                group
              "
            >

              <div className="
                relative
                flex
                items-center
                justify-center
                w-8
                h-8
              ">

                <Globe
                  className="
                    w-8
                    h-8
                    text-teal-600
                    dark:text-cyan-400
                    group-hover:rotate-180
                    transition-transform
                    duration-700
                  "
                  strokeWidth={1.5}
                />


                <MapPin
                  className="
                    absolute
                    -top-1
                    -right-1
                    w-4
                    h-4
                    text-orange-500
                    fill-orange-100
                    dark:fill-orange-900
                  "
                />

              </div>


              <span className="
                text-2xl
                font-bold
                bg-gradient-to-r
                from-teal-500
                to-cyan-600
                bg-clip-text
                text-transparent
              ">
                TourEase
              </span>


            </div>
            
            
            {/* DESKTOP MENU */}

            <div className="
              hidden
              min-[1200px]:flex
              items-center
              gap-2
              flex-1
              justify-center
              px-4
            ">


              {navItems.map((item, index) => {

                const hoverColors = [
                  "hover:bg-cyan-100 dark:hover:bg-cyan-900/30",
                  "hover:bg-blue-100 dark:hover:bg-blue-900/30",
                  "hover:bg-purple-100 dark:hover:bg-purple-900/30",
                  "hover:bg-pink-100 dark:hover:bg-pink-900/30",
                  "hover:bg-orange-100 dark:hover:bg-orange-900/30",
                  "hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
                  "hover:bg-violet-100 dark:hover:bg-violet-900/30",
                  "hover:bg-amber-100 dark:hover:bg-amber-900/30",
                  "hover:bg-lime-100 dark:hover:bg-lime-900/30"
                ];


                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      px-3
                      py-2
                      rounded-lg
                      font-semibold
                      text-sm
                      whitespace-nowrap
                      transition-all

                      ${
                        isActive(item.path)
                          ? "bg-teal-500 text-white"
                          : `
                            text-gray-700
                            dark:text-gray-300
                            ${hoverColors[index]}
                          `
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );

              })}



              {/* FAVORITES */}

              <Link
                to="/favorites"
                className={`
                  relative
                  px-3
                  py-2
                  rounded-lg
                  flex
                  items-center
                  gap-2
                  font-semibold
                  text-sm
                  transition-all

                  ${
                    isActive("/favorites")
                      ? "bg-teal-500 text-white"
                      :
                      `
                      text-gray-700
                      dark:text-gray-300
                      hover:bg-red-100
                      dark:hover:bg-red-900/30
                      `
                  }
                `}
              >

                <Heart
                  className="
                    w-5
                    h-5
                  "
                />


                Favorites


                {
                  favoriteIds.length > 0 && (

                    <span className="
                      absolute
                      -top-2
                      -right-2
                      bg-red-500
                      text-white
                      text-xs
                      rounded-full
                      px-2
                      py-0.5
                    ">
                      {favoriteIds.length}
                    </span>

                  )
                }


              </Link>


            </div>




            {/* ACTIONS */}

            <div className="
              flex
              items-center
              gap-4
            ">



              {/* THEME */}


              <button
                onClick={toggleTheme}
                title="Toggle theme"
                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  transition
                "
              >

                {
                  theme === "dark"
                    ?
                    (
                      <Moon className="
                        w-5
                        h-5
                        text-white
                      "/>
                    )
                    :
                    (
                      <Sun className="
                        w-5
                        h-5
                        text-yellow-500
                      "/>
                    )
                }


              </button>




             <LanguageSelector variant="inline" />



              {/* LOGIN / LOGOUT */}


              {
                !isLoggedIn
                  ?

                  (
                    <Link
                      to="/trip-planner"
                      className="
                        hidden
                        min-[1200px]:block
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        px-6
                        py-2
                        rounded-lg
                        font-semibold
                        transition
                      "
                    >
                      Get Started
                    </Link>
                  )


                  :

                  (

                    <button
                      onClick={handleLogout}
                      className="
                        hidden
                        min-[1200px]:block
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-6
                        py-2
                        rounded-lg
                        font-semibold
                        transition
                      "
                    >
                      Logout
                    </button>

                  )

              }




              {/* MOBILE BUTTON */}


              <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                  min-[1200px]:hidden
                  p-2
                  rounded-lg
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                "
              >

                {
                  isOpen
                    ?
                    <X className="w-6 h-6"/>
                    :
                    <Menu className="w-6 h-6"/>
                }


              </button>



            </div>


          </div>


        </div>


      </nav>

      
      {/* MOBILE BACKDROP */}

      <div
        className={`
          fixed
          inset-0
          z-40
          min-[1200px]:hidden
          bg-black/50
          backdrop-blur-sm

          ${
            isOpen
              ? "backdrop-open pointer-events-auto"
              : "backdrop-close pointer-events-none"
          }
        `}
        onClick={() => setIsOpen(false)}
      />




      {/* MOBILE MENU */}

      <div
        className={`
          fixed
          top-0
          right-0
          bottom-0
          z-50
          w-80
          bg-white
          dark:bg-gray-900
          shadow-2xl
          min-[1200px]:hidden

          ${
            isOpen
              ? "menu-open"
              : "menu-close"
          }
        `}
      >


        <div className="
          flex
          flex-col
          h-full
          p-6
        ">



          {/* HEADER */}

          <div className="
            flex
            justify-between
            items-center
            mb-6
          ">

            <span className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            ">
              Menu
            </span>


            <button
              onClick={() => setIsOpen(false)}
              className="
                p-2
                rounded-lg
                hover:bg-gray-100
                dark:hover:bg-gray-800
              "
            >

              <X className="w-6 h-6"/>

            </button>


          </div>





          {/* LINKS */}

          <div className="
            flex-1
            overflow-y-auto
            space-y-3
          ">


            {
              navItems.map((item) => (

                <Link

                  key={item.path}

                  to={item.path}

                  onClick={() => setIsOpen(false)}

                  className={`
                    block
                    px-5
                    py-4
                    rounded-xl
                    font-semibold
                    transition

                    ${
                      isActive(item.path)

                      ?

                      `
                      bg-gradient-to-r
                      from-teal-500
                      to-cyan-600
                      text-white
                      `

                      :

                      `
                      text-gray-700
                      dark:text-gray-200
                      hover:bg-gray-100
                      dark:hover:bg-gray-800
                      `
                    }

                  `}
                >

                  {item.label}


                </Link>


              ))
            }




            {/* FAVORITES MOBILE */}


            <Link

              to="/favorites"

              onClick={() => setIsOpen(false)}

              className={`
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-xl
                font-semibold

                ${
                  isActive("/favorites")

                  ?

                  "bg-teal-500 text-white"

                  :

                  `
                  text-gray-700
                  dark:text-gray-200
                  hover:bg-red-100
                  dark:hover:bg-red-900/30
                  `
                }

              `}

            >


              <Heart className="w-5 h-5"/>


              Favorites


              {
                favoriteIds.length > 0 && (

                  <span className="
                    ml-auto
                    bg-red-500
                    text-white
                    text-xs
                    rounded-full
                    px-3
                    py-1
                  ">

                    {favoriteIds.length}

                  </span>

                )
              }


            </Link>



            <div className="pt-4">

              <LanguageSelector
                variant="inline"
                className="w-full"
              />

            </div>



          </div>






          {/* BOTTOM BUTTON */}


          <div className="
            pt-5
            border-t
            border-gray-200
            dark:border-gray-700
          ">


            {
              !isLoggedIn

              ?

              (

                <Link

                  to="/login"

                  onClick={() => setIsOpen(false)}

                  className="
                    block
                    w-full
                    text-center
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    py-4
                    rounded-xl
                    font-bold
                  "

                >

                  Get Started


                </Link>

              )


              :

              (

                <button

                  onClick={() => {

                    setIsOpen(false);
                    handleLogout();

                  }}

                  className="
                    block
                    w-full
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-4
                    rounded-xl
                    font-bold
                  "

                >

                  Logout


                </button>

              )


            }


          </div>


        </div>


      </div>


    </>
  );
}