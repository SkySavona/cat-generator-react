import React, { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

const NavMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const burgerMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-[#87ceeb] pb-10 pt-5">
      <div className="flex justify-between items-center w-[90%] max-w-[1200px] mx-auto pt-[10px]">
        <img
          className="logo"
          src="../assets/cat_image_generator.png"
          alt="Cat Generator"
        />
        <div
          ref={burgerMenuRef}
          className="burger-menu sm:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu size={30} color="#f18d99" />
        </div>
        <ul className="hidden sm:flex gap-[20px] list-none m-0 p-0">
          {["Home", "Generate Your Cat", "Contact"].map((item, index) => (
            <li key={index}>
              <a
                href={
                  item === "Home"
                    ? "/"
                    : item === "Generate Your Cat"
                    ? "#breed-select"
                    : "/"
                }
                className={`text-white no-underline text-shadow-sm text-[1.2rem] transition-transform duration-300 ease-in-out opacity-0 animate-fadeIn inline-block cursor-pointer hover:text-[#ffdab9] hover:scale-110 ${
                  item === "Contact" ? "cursor-not-allowed" : ""
                }`}
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-0 left-0 w-full h-full bg-[#87ceeb] z-[1000] flex flex-col justify-center items-center sm:hidden"
        >
          <div
            className="absolute top-[20px] right-[20px] text-[30px] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#ffdab9]"
            onClick={toggleMobileMenu}
          >
            &times;
          </div>
          {["Home", "Generate Your Cat", "Contact"].map((item, index) => (
            <a
              key={index}
              href={
                item === "Home"
                  ? "/"
                  : item === "Generate Your Cat"
                  ? "#breed-select"
                  : "/"
              }
              className={`text-white text-[24px] my-[20px] no-underline transition-colors duration-300 ease-in-out hover:text-[#ffdab9] ${
                item === "Contact" ? "cursor-not-allowed" : ""
              }`}
              onClick={item !== "Contact" ? toggleMobileMenu : undefined}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;