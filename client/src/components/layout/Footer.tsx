import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t pt-12 pb-8"
      style={{
        backgroundColor: "#f8f7f4",
        borderTopColor: "rgba(185, 167, 121, 0.3)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/src/assets/images/logo.png"
                alt="DamasGo"
                className="w-48 opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#6b6768" }}>
              Discover the world's most exciting adventures with Natours.
              Unforgettable tours led by expert guides in breathtaking
              locations.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "#edebe0",
                  color: "#428177",
                }}
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "#edebe0",
                  color: "#428177",
                }}
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "#edebe0",
                  color: "#428177",
                }}
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: "#edebe0",
                  color: "#428177",
                }}
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-base mb-4"
              style={{ color: "#3d3a3b" }}
            >
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
                    className="text-sm transition-colors duration-200 inline-block relative group"
                    style={{ color: "#6b6768" }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: "#428177" }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-base mb-4"
              style={{ color: "#3d3a3b" }}
            >
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
                    className="text-sm transition-colors duration-200 inline-block relative group"
                    style={{ color: "#6b6768" }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: "#428177" }}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-base mb-4"
              style={{ color: "#3d3a3b" }}
            >
              Get in Touch
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <MapPin
                  className="h-4 w-4 mt-0.5 shrink-0"
                  style={{ color: "#428177" }}
                />
                <p className="text-sm" style={{ color: "#6b6768" }}>
                  123 Adventure Street, Travel City, TC 12345
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#428177" }}
                />
                <a
                  href="tel:+1234567890"
                  className="text-sm transition-colors"
                  style={{ color: "#6b6768" }}
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#428177" }}
                />
                <a
                  href="mailto:hello@natours.com"
                  className="text-sm transition-colors"
                  style={{ color: "#6b6768" }}
                >
                  hello@DamasGo.com
                </a>
              </div>
            </div>

            <div>
              <h4
                className="font-medium text-sm mb-3"
                style={{ color: "#3d3a3b" }}
              >
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: "#b9a779",
                    backgroundColor: "white",
                    color: "#3d3a3b",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#428177";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#b9a779";
                  }}
                />
                <Button
                  className="px-4 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #428177 0%, #054239 100%)",
                  }}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTopColor: "rgba(185, 167, 121, 0.3)" }}
        >
          <p className="text-sm" style={{ color: "#6b6768" }}>
            © {currentYear} Natours. Created by{" "}
            <span style={{ color: "#428177" }} className="font-medium">
              Ahmad Alaa Eddin
            </span>
            . All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/terms"
              className="text-sm transition-colors duration-200"
              style={{ color: "#6b6768" }}
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sm transition-colors duration-200"
              style={{ color: "#6b6768" }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
