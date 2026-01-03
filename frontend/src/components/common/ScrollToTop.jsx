import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-indigo-600 dark:to-purple-600 text-white shadow-lg dark:shadow-xl transition-all duration-300 hover:scale-110 hover:from-blue-500 hover:to-blue-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 hover:shadow-xl dark:hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
