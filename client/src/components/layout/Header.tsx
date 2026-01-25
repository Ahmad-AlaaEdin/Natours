import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Container from "@/components/layout/Container";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-brand-secondary/30 shadow-md">
      <Container as="nav">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center  group flex-col">
            <img src={logo} alt="" className="md:w-60 w-40" />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <Button
                variant="ghost"
                className="hover:bg-brand-accent text-brand-dark flex items-center gap-2 px-2"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user.photo || "/img/default.png"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-brand-primary/50"
                />
                <span className="font-medium text-sm">
                  {user.name.split(" ")[0]}
                </span>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="hover:bg-brand-accent text-brand-dark"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="text-white shadow-lg hover:shadow-xl transition-all duration-200 bg-linear-to-br from-brand-primary to-brand-primary-dark border-brand-forest"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 transition-colors text-brand-primary"
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
          <div className="md:hidden py-4 border-t border-brand-secondary/30">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full border-brand-secondary text-brand-dark"
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
                      className="w-full border-brand-secondary text-brand-dark"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      className="w-full text-white shadow-lg bg-linear-to-br from-brand-primary to-brand-primary-dark"
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
      </Container>
    </header>
  );
}
