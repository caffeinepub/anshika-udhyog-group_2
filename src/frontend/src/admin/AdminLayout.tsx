import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  ClipboardList,
  DollarSign,
  FileBadge,
  FileCheck,
  FileText,
  Globe,
  Heart,
  Home,
  Image,
  Layers,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Trophy,
  Truck,
  UserCheck,
  Users,
  Users2,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "KYC Management", icon: FileCheck, path: "/admin/kyc" },
  {
    label: "Login Management",
    icon: UserCheck,
    path: "/admin/login-management",
  },
  { label: "Home Page", icon: Home, path: "/admin/home-page" },
  { label: "Company Settings", icon: Settings, path: "/admin/settings" },
  { label: "Footer Settings", icon: Globe, path: "/admin/footer" },
  { label: "News Management", icon: Newspaper, path: "/admin/news" },
  { label: "Gallery", icon: Image, path: "/admin/gallery" },
  { label: "Training Programs", icon: BookOpen, path: "/admin/training" },
  { label: "Centers", icon: Building2, path: "/admin/centers" },
  { label: "Schemes", icon: Layers, path: "/admin/schemes" },
  { label: "Loan Management", icon: DollarSign, path: "/admin/loan" },
  { label: "Employment", icon: Briefcase, path: "/admin/employment" },
  { label: "Rewards", icon: Trophy, path: "/admin/rewards" },
  { label: "Products", icon: ShoppingBag, path: "/admin/products" },
  { label: "Reviews", icon: Star, path: "/admin/reviews" },
  { label: "Applications", icon: ClipboardList, path: "/admin/applications" },
  { label: "Franchise Page", icon: Award, path: "/admin/franchise" },
  {
    label: "Franchise Partners",
    icon: Users2,
    path: "/admin/franchise-partners",
  },
  { label: "Internship", icon: FileBadge, path: "/admin/internship" },
  { label: "B2B Plans", icon: Briefcase, path: "/admin/b2b" },
  { label: "Leadership Team", icon: Heart, path: "/admin/leadership" },
  { label: "Legal Documents", icon: FileText, path: "/admin/legal-docs" },
  { label: "Wishes Letters", icon: Mail, path: "/admin/wishes" },
  { label: "Our Team", icon: Users, path: "/admin/our-team" },
  { label: "Our Partners", icon: Layers, path: "/admin/our-partners" },
  { label: "YouTube Videos", icon: Video, path: "/admin/youtube" },
  { label: "Image Slider", icon: SlidersHorizontal, path: "/admin/slider" },
  {
    label: "Official Letters",
    icon: FileText,
    path: "/admin/official-letters",
  },
  { label: "Transport", icon: Truck, path: "/admin/transport" },
];

export default function AdminLayout() {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-green-900 text-white flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-green-700 flex items-center gap-3">
          <img
            src="/assets/generated/anshika-logo.dim_200x200.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold text-sm leading-tight">Admin Panel</div>
            <div className="text-xs text-green-300">Anshika Udhyog Group</div>
          </div>
          <button
            className="ml-auto lg:hidden text-green-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                location.pathname === item.path
                  ? "bg-green-700 text-white font-medium"
                  : "text-green-200 hover:bg-green-800 hover:text-white"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-green-700">
          <div className="text-xs text-green-300 mb-2">
            {currentUser?.name} ({currentUser?.role})
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-green-200 hover:bg-green-800 justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="font-semibold text-gray-800">Admin Dashboard</div>
          <div className="ml-auto text-sm text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
