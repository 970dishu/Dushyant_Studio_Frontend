import { ArrowUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/Dushyant_Dishu" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dushyant-garg-955869213/" },
    { name: "Instagram", href: "https://www.instagram.com/aks.dushyant/" },
    { name: "Behance", href: "https://www.behance.net/970dishu1" },
  ];

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8 md:mb-16">
          <a href="#" className="font-heading text-2xl font-semibold text-foreground">
            Dushyant<span className="text-primary">.studio</span>
          </a>

          <nav className="flex flex-wrap gap-6 md:gap-8">
            {navLinks.map((link) =>
              isHomePage ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={`/${link.href}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-wrap gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">Dushyant Garg</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
