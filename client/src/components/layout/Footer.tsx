import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t pt-12 pb-8 bg-brand-bg border-brand-secondary/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 text-center">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/src/assets/images/logo.png"
                alt="DamasGo"
                className="w-48 opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed text-brand-text">
              Discover the world's most exciting adventures with DamasGo.
              Unforgettable tours led by expert guides in breathtaking
              locations.
            </p>

            <div className="flex gap-3 pt-2 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 bg-brand-accent text-brand-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 bg-brand-accent text-brand-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 bg-brand-accent text-brand-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110 bg-brand-accent text-brand-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 text-brand-dark">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "All Tours", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Destinations", path: "/destinations" },
                { label: "Travel Guides", path: "/guides" },
                { label: "Reviews", path: "/reviews" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 inline-block relative group text-brand-text"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-brand-primary"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 text-brand-dark">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center", path: "/help" },
                { label: "Contact Us", path: "/contact" },
                { label: "Become a Guide", path: "/become-guide" },
                { label: "Careers", path: "/careers" },
                { label: "Privacy Policy", path: "/privacy" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 inline-block relative group text-brand-text"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-brand-primary"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 text-brand-dark">
              Get in Touch
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 justify-center">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-primary" />
                <p className="text-sm text-brand-text">Damascus, Syria</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Mail className="h-4 w-4 shrink-0 text-brand-primary" />
                <a
                  href="mailto:hello@damasgo.com"
                  className="text-sm transition-colors text-brand-text"
                >
                  hello@damasgo.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-3 text-brand-dark">
                Subscribe to Newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-md border border-brand-secondary bg-white text-brand-dark focus:outline-none focus:ring-2 focus:border-brand-primary transition-all w-full"
                />
                <Button className="px-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 bg-linear-to-br from-brand-primary to-brand-primary-dark w-full sm:w-auto">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-secondary/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-text text-center w-full">
            © {currentYear} DamasGo. Created by{" "}
            <span className="font-medium text-brand-primary">
              Ahmad Alaa Eddin
            </span>
            . All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
