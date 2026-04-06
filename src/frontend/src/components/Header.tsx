import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, LogIn, Menu, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const menuCategories = [
  {
    label: "Organization",
    icon: "🏢",
    items: [
      { label: "About Us", path: "/about" },
      { label: "Our Team", path: "/our-team" },
      { label: "Our Partners", path: "/our-partners" },
      { label: "Legal Documents", path: "/legal-documents" },
      { label: "Wishes", path: "/wishes" },
    ],
  },
  {
    label: "Schemes",
    icon: "📋",
    items: [
      { label: "Scheme Details", path: "/schemes" },
      { label: "Loan", path: "/loan" },
      { label: "SHG Loan", path: "/shg-loan" },
      { label: "Udhyog Loan", path: "/udhyog-loan" },
      { label: "Employment", path: "/employment" },
      { label: "Rewards", path: "/rewards" },
    ],
  },
  {
    label: "Programs",
    icon: "🎓",
    items: [
      { label: "Training", path: "/training" },
      { label: "Our Centers", path: "/centers" },
      { label: "Franchise", path: "/franchise" },
      { label: "B2B Plan", path: "/b2b-plan" },
      { label: "Internship", path: "/internship" },
    ],
  },
  {
    label: "Media",
    icon: "📰",
    items: [
      { label: "News", path: "/news" },
      { label: "Gallery", path: "/gallery" },
      { label: "Downloads", path: "/downloads" },
    ],
  },
  {
    label: "Info",
    icon: "ℹ️",
    items: [
      { label: "Contact", path: "/contact" },
      { label: "FAQ", path: "/faq" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Rules & Regulations", path: "/rules" },
      { label: "Complaint", path: "/complaint" },
    ],
  },
];

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "bn", label: "বাংলা" },
];

export default function Header() {
  const { settings, currentUser, logout } = useAppContext();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setActiveCategory(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  function handleLangChange(code: string) {
    setLangOpen(false);
    // Google Translate integration
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top white bar */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={
                settings.logoUrl ||
                "/assets/generated/anshika-logo.dim_200x200.png"
              }
              alt="Anshika Udhyog Group"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg text-green-800 leading-tight">
                {settings.orgName}
              </div>
              <div className="text-xs text-green-600">{settings.subtitle}</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <Link
                  to={
                    currentUser.role === "admin"
                      ? "/admin/dashboard"
                      : `/${currentUser.role === "user" ? "user" : currentUser.role}/dashboard`
                  }
                  className="text-sm font-medium text-green-700 hover:text-green-900"
                >
                  {currentUser.name}
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="border-green-600 text-green-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50 gap-1"
                  >
                    <LogIn size={14} /> Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-green-700 hover:bg-green-800 text-white gap-1"
                    data-ocid="header.primary_button"
                  >
                    <UserPlus size={14} /> Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Green nav bar */}
      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="hidden md:block">
            <span className="font-bold text-yellow-300 text-sm tracking-wide uppercase">
              ✦ {settings.tagline}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen(!langOpen);
                }}
                className="flex items-center gap-1 text-xs text-white/80 hover:text-white px-2 py-1 rounded border border-white/30 hover:border-white/60"
              >
                <Globe size={12} /> Language <ChevronDown size={10} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-32">
                  {languages.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className="block w-full text-left px-3 py-2 text-sm hover:bg-green-50"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="header.toggle"
          >
            {mobileOpen ? (
              <X size={24} />
            ) : (
              <div className="flex flex-col gap-1">
                <span
                  className="block bg-white rounded"
                  style={{ width: 24, height: 3 }}
                />
                <span
                  className="block bg-white rounded"
                  style={{ width: 18, height: 2 }}
                />
                <span
                  className="block bg-white rounded"
                  style={{ width: 14, height: 2 }}
                />
              </div>
            )}
          </button>
          <span className="md:hidden font-bold text-yellow-300 text-xs">
            {settings.tagline}
          </span>
        </div>
      </div>

      {/* Desktop mega menu */}
      <nav className="bg-green-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-2 text-white text-sm hover:bg-green-600 font-medium"
            >
              Home
            </Link>
            {menuCategories.map((cat, idx) => (
              <div
                key={(cat as any).label || (cat as any).id || String(idx)}
                className="relative"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory(activeCategory === idx ? null : idx);
                  }}
                  className={`flex items-center gap-1 px-3 py-2 text-sm text-white hover:bg-green-600 ${
                    activeCategory === idx ? "bg-green-600" : ""
                  }`}
                >
                  <span>{cat.icon}</span> {cat.label} <ChevronDown size={12} />
                </button>
                {activeCategory === idx && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-b z-50 min-w-48 animate-slide-in">
                    {cat.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                        onClick={() => setActiveCategory(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-700 max-h-[70vh] overflow-y-auto">
          <Link
            to="/"
            className="block px-4 py-3 text-white border-b border-green-700"
            onClick={() => setMobileOpen(false)}
          >
            🏠 Home
          </Link>
          {menuCategories.map((cat, idx) => (
            <div
              key={(cat as any).label || (cat as any).id || String(idx)}
              className="border-b border-green-700"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 text-white"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === idx ? null : idx)
                }
              >
                <span className="font-medium">
                  {cat.icon} {cat.label}
                </span>
                <ChevronDown
                  size={16}
                  className={mobileExpanded === idx ? "rotate-180" : ""}
                />
              </button>
              {mobileExpanded === idx && (
                <div className="bg-green-950">
                  {cat.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-8 py-2 text-green-200 text-sm hover:text-white"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileExpanded(null);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {!currentUser && (
            <div className="p-4 flex gap-2">
              <Link
                to="/login"
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white text-white"
                >
                  Login
                </Button>
              </Link>
              <Link
                to="/signup"
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                <Button
                  size="sm"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
