import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { name: "Twitter", href: "https://x.com/Dushyant_Dishu" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/dushyant-garg-955869213/" },
    { name: "Instagram", href: "https://www.instagram.com/dushyant_dishu/" },
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
          {/* Logo */}
          <a href="#" className="font-heading text-2xl font-semibold text-foreground">
            Dushyant<span className="text-primary">.studio</span>
          </a>

          {/* Nav Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Dushyant Garg
          </p>

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
