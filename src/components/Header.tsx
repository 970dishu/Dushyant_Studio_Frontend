import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import dushyantPortrait from "/assets/dushyant-portrait.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? "#" : "/", label: "Home", isAnchor: !isHomePage ? false : true },
    { href: "/my-story", label: "Story", isAnchor: false },
    { href: isHomePage ? "#work" : "/#work", label: "Work", isAnchor: isHomePage },
    { href: isHomePage ? "#testimonials" : "/#testimonials", label: "Clients", isAnchor: isHomePage },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-4 md:py-6">
      <div className="flex justify-center px-4">
        {/* Desktop Navigation - Full nav or "Available for work" based on scroll */}
        <nav className="hidden lg:flex items-center gap-2 bg-secondary/80 backdrop-blur-md rounded-full px-2 py-2 transition-all duration-500">
          {/* Profile Picture with Name below */}
          <div className="relative flex flex-col items-center">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30">
              <img 
                src={dushyantPortrait} 
                alt="Dushyant" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name that appears below picture when scrolled */}
            <span 
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 font-cursive text-xs text-primary whitespace-nowrap transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            >
              Dushyant
            </span>
          </div>

          {/* Nav Links - Hidden when scrolled */}
          <div className={`flex items-center gap-1 px-2 transition-all duration-500 overflow-hidden ${isScrolled ? 'max-w-0 opacity-0 px-0' : 'max-w-[500px] opacity-100'}`}>
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* "Available for work" text - Shown when scrolled */}
          <a href={isHomePage ? "#contact" : "/#contact"} className={`flex items-center gap-2 transition-all duration-500 overflow-hidden cursor-pointer hover:text-primary ${isScrolled ? 'max-w-[200px] opacity-100 pr-2' : 'max-w-0 opacity-0'}`}>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">Available for work</span>
            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 animate-pulse"></span>
          </a>

          {/* Contact Button / Hamburger Menu - Smooth transition */}
          <div className="relative flex items-center justify-center" style={{ width: isScrolled ? '40px' : '100px', transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}>
            <a
              href={isHomePage ? "#contact" : "/#contact"}
              className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium bg-white text-background rounded-full hover:bg-primary hover:text-primary-foreground whitespace-nowrap transition-all duration-400 ${isScrolled ? 'opacity-0 pointer-events-none absolute scale-75' : 'opacity-100 relative scale-100'}`}
            >
              Contact
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full transition-all duration-400 ${isScrolled ? 'opacity-100 scale-100 relative' : 'opacity-0 pointer-events-none absolute scale-75'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Tablet/Mobile Navigation - "Available for work" pill */}
        <div className="lg:hidden flex items-center justify-center">
          <div className="flex items-center gap-3 bg-secondary/80 backdrop-blur-md rounded-full px-2 py-2">
            {/* Profile Picture */}
          {/* Profile Picture with Name below */}
          <div className="relative flex flex-col items-center">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/30">
              <img 
                src={dushyantPortrait} 
                alt="Dushyant" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name that appears below picture when scrolled */}
            <span 
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 font-cursive text-xs text-primary whitespace-nowrap transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            >
              Dushyant
            </span>
          </div>

            {/* Available for work text with green dot */}
            <a href={isHomePage ? "#contact" : "/#contact"} className="flex items-center gap-2 pr-2 cursor-pointer hover:text-primary transition-colors min-w-0">
              <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-none">Available for work</span>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0"></span>
            </a>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Desktop Menu Overlay */}
      {isMenuOpen && (
        <div className="mt-4 mx-4 bg-secondary/95 backdrop-blur-md rounded-2xl max-h-[80vh] overflow-y-auto">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href={isHomePage ? "#contact" : "/#contact"}
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-medium bg-white text-background rounded-full"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
