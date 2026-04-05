import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Footer() {
  const { settings, contentMap } = useAppContext();
  const footerData = (contentMap.footer_settings || {}) as Record<
    string,
    string
  >;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={
                  settings.logoUrl ||
                  "/assets/generated/anshika-logo.dim_200x200.png"
                }
                alt="Anshika Udhyog Group"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg leading-tight">
                  {settings.orgName}
                </div>
                <div className="text-xs text-green-300">
                  {settings.subtitle}
                </div>
              </div>
            </div>
            <p className="text-green-300 text-sm">
              {settings.footerText ||
                footerData.footerText ||
                "Empowering Women — Building a Stronger India"}
            </p>
            <div className="flex gap-3 mt-4">
              {footerData.facebook && (
                <a
                  href={footerData.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-300 hover:text-white"
                >
                  <Facebook size={18} />
                </a>
              )}
              {footerData.twitter && (
                <a
                  href={footerData.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-300 hover:text-white"
                >
                  <Twitter size={18} />
                </a>
              )}
              {footerData.instagram && (
                <a
                  href={footerData.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-300 hover:text-white"
                >
                  <Instagram size={18} />
                </a>
              )}
              {footerData.youtube && (
                <a
                  href={footerData.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-300 hover:text-white"
                >
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-white">
                  Schemes
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-white">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-white">
                  Franchise
                </Link>
              </li>
              <li>
                <Link to="/internship" className="hover:text-white">
                  Internship
                </Link>
              </li>
              <li>
                <Link to="/b2b-plan" className="hover:text-white">
                  B2B Plan
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-4">Legal & Info</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>
                <Link to="/legal-documents" className="hover:text-white">
                  Legal Documents
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-white">
                  Rules & Regulations
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/complaint" className="hover:text-white">
                  Complaint
                </Link>
              </li>
              <li>
                <Link to="/wishes" className="hover:text-white">
                  Wishes
                </Link>
              </li>
              <li>
                <Link to="/our-team" className="hover:text-white">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-green-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 text-yellow-400 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-yellow-400" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-yellow-400" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                to="/role-login"
                className="text-xs text-green-400 hover:text-yellow-300 underline"
              >
                Role-based Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-400">
          <span>
            © {year} {settings.orgName}. All rights reserved.
          </span>
          <span>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-300 hover:text-white"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
