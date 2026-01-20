import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-[#b9a779]/30 shadow-md">
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center  group flex-col">
            <img src="/src/assets/images/logo.png" alt="" className="w-60" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="transition-colors duration-200 relative group"
              style={{ color: "#3d3a3b" }}
            >
              All Tours
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#428177" }}
              ></span>
            </Link>
            <a
              href="#destinations"
              className="transition-colors duration-200 relative group"
              style={{ color: "#3d3a3b" }}
            >
              Destinations
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#428177" }}
              ></span>
            </a>
            <a
              href="#about"
              className="transition-colors duration-200 relative group"
              style={{ color: "#3d3a3b" }}
            >
              About
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#428177" }}
              ></span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="hover:bg-[#edebe0]"
                style={{ color: "#3d3a3b" }}
                onClick={() => navigate("/profile")}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hover:bg-[#edebe0]"
                  style={{ color: "#3d3a3b" }}
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{
                    background:
                      "linear-gradient(135deg, #428177 0%, #054239 100%)",
                    borderColor: "#002623",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: "#428177" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: "rgba(185, 167, 121, 0.3)" }}
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="transition-colors px-2 py-2"
                style={{ color: "#3d3a3b" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tours
              </Link>
              <a
                href="#destinations"
                className="transition-colors px-2 py-2"
                style={{ color: "#3d3a3b" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Destinations
              </a>
              <a
                href="#about"
                className="transition-colors px-2 py-2"
                style={{ color: "#3d3a3b" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <div
                className="flex flex-col gap-2 pt-4 border-t"
                style={{ borderColor: "rgba(185, 167, 121, 0.3)" }}
              >
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      className="w-full text-white shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #428177 0%, #054239 100%)",
                      }}
                      onClick={() => {
                        navigate("/signup");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
