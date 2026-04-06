import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import { AppProvider } from "./context/AppContext";
import { useAppContext } from "./context/AppContext";

import AboutUs from "./pages/AboutUs";
import B2BPlan from "./pages/B2BPlan";
import Complaint from "./pages/Complaint";
import Contact from "./pages/Contact";
import Downloads from "./pages/Downloads";
import Employment from "./pages/Employment";
import FAQ from "./pages/FAQ";
import Franchise from "./pages/Franchise";
import Gallery from "./pages/Gallery";
// Pages
import Home from "./pages/Home";
import Internship from "./pages/Internship";
import LegalDocuments from "./pages/LegalDocuments";
import Loan from "./pages/Loan";
import Login from "./pages/Login";
import News from "./pages/News";
import OurCenters from "./pages/OurCenters";
import OurPartners from "./pages/OurPartners";
import OurTeam from "./pages/OurTeam";
import Rewards from "./pages/Rewards";
import RoleLogin from "./pages/RoleLogin";
import Rules from "./pages/Rules";
import SHGLoan from "./pages/SHGLoan";
import SchemeDetails from "./pages/SchemeDetails";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Training from "./pages/Training";
import UdhyogLoan from "./pages/UdhyogLoan";
import Wishes from "./pages/Wishes";

import AdminApplications from "./admin/AdminApplications";
import AdminB2BPlans from "./admin/AdminB2BPlans";
import AdminCenters from "./admin/AdminCenters";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEmployment from "./admin/AdminEmployment";
import AdminFooter from "./admin/AdminFooter";
import AdminFranchise from "./admin/AdminFranchise";
import AdminFranchisePartners from "./admin/AdminFranchisePartners";
import AdminGallery from "./admin/AdminGallery";
import AdminHomePage from "./admin/AdminHomePage";
import AdminIDCards from "./admin/AdminIDCards";
import AdminInternship from "./admin/AdminInternship";
import AdminKYC from "./admin/AdminKYC";
// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminLeadership from "./admin/AdminLeadership";
import AdminLegalDocs from "./admin/AdminLegalDocs";
import AdminLoan from "./admin/AdminLoan";
import AdminLoginManagement from "./admin/AdminLoginManagement";
import AdminNews from "./admin/AdminNews";
import AdminOfficialLetters from "./admin/AdminOfficialLetters";
import AdminOurPartners from "./admin/AdminOurPartners";
import AdminOurTeam from "./admin/AdminOurTeam";
import AdminPageContent from "./admin/AdminPageContent";
import AdminProducts from "./admin/AdminProducts";
import AdminReviews from "./admin/AdminReviews";
import AdminRewards from "./admin/AdminRewards";
import AdminSchemes from "./admin/AdminSchemes";
import AdminSettings from "./admin/AdminSettings";
import AdminSlider from "./admin/AdminSlider";
import AdminTraining from "./admin/AdminTraining";
import AdminTransport from "./admin/AdminTransport";
import AdminUsers from "./admin/AdminUsers";
import AdminWishes from "./admin/AdminWishes";
import AdminYouTube from "./admin/AdminYouTube";

import CenterDashboard from "./dashboards/CenterDashboard";
import FranchiseDashboard from "./dashboards/FranchiseDashboard";
import HRDashboard from "./dashboards/HRDashboard";
import SupervisorDashboard from "./dashboards/SupervisorDashboard";
import TransportDashboard from "./dashboards/TransportDashboard";
// Dashboards
import UserDashboard from "./dashboards/UserDashboard";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function AppRoutes() {
  const { currentUser } = useAppContext();

  return (
    <Routes>
      {/* Public Pages */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutUs />
          </PublicLayout>
        }
      />
      <Route
        path="/schemes"
        element={
          <PublicLayout>
            <SchemeDetails />
          </PublicLayout>
        }
      />
      <Route
        path="/centers"
        element={
          <PublicLayout>
            <OurCenters />
          </PublicLayout>
        }
      />
      <Route
        path="/training"
        element={
          <PublicLayout>
            <Training />
          </PublicLayout>
        }
      />
      <Route
        path="/employment"
        element={
          <PublicLayout>
            <Employment />
          </PublicLayout>
        }
      />
      <Route
        path="/loan"
        element={
          <PublicLayout>
            <Loan />
          </PublicLayout>
        }
      />
      <Route
        path="/shg-loan"
        element={
          <PublicLayout>
            <SHGLoan />
          </PublicLayout>
        }
      />
      <Route
        path="/udhyog-loan"
        element={
          <PublicLayout>
            <UdhyogLoan />
          </PublicLayout>
        }
      />
      <Route
        path="/rewards"
        element={
          <PublicLayout>
            <Rewards />
          </PublicLayout>
        }
      />
      <Route
        path="/news"
        element={
          <PublicLayout>
            <News />
          </PublicLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <PublicLayout>
            <Gallery />
          </PublicLayout>
        }
      />
      <Route
        path="/downloads"
        element={
          <PublicLayout>
            <Downloads />
          </PublicLayout>
        }
      />
      <Route
        path="/legal-documents"
        element={
          <PublicLayout>
            <LegalDocuments />
          </PublicLayout>
        }
      />
      <Route
        path="/wishes"
        element={
          <PublicLayout>
            <Wishes />
          </PublicLayout>
        }
      />
      <Route
        path="/our-team"
        element={
          <PublicLayout>
            <OurTeam />
          </PublicLayout>
        }
      />
      <Route
        path="/our-partners"
        element={
          <PublicLayout>
            <OurPartners />
          </PublicLayout>
        }
      />
      <Route
        path="/franchise"
        element={
          <PublicLayout>
            <Franchise />
          </PublicLayout>
        }
      />
      <Route
        path="/b2b-plan"
        element={
          <PublicLayout>
            <B2BPlan />
          </PublicLayout>
        }
      />
      <Route
        path="/internship"
        element={
          <PublicLayout>
            <Internship />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route
        path="/faq"
        element={
          <PublicLayout>
            <FAQ />
          </PublicLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <PublicLayout>
            <Terms />
          </PublicLayout>
        }
      />
      <Route
        path="/rules"
        element={
          <PublicLayout>
            <Rules />
          </PublicLayout>
        }
      />
      <Route
        path="/complaint"
        element={
          <PublicLayout>
            <Complaint />
          </PublicLayout>
        }
      />

      {/* Auth */}
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route
        path="/franchise-partner/login"
        element={
          currentUser ? (
            <Navigate to="/franchise-partner/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/role-login"
        element={
          <PublicLayout>
            <RoleLogin />
          </PublicLayout>
        }
      />

      {/* Role Dashboards */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/center/dashboard"
        element={
          <ProtectedRoute allowedRoles={["center"]}>
            <CenterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <SupervisorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transport/dashboard"
        element={
          <ProtectedRoute allowedRoles={["transport"]}>
            <TransportDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr/dashboard"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <HRDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/franchise-partner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["franchise"]}>
            <FranchiseDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="kyc" element={<AdminKYC />} />
        <Route path="login-management" element={<AdminLoginManagement />} />
        <Route path="home-page" element={<AdminHomePage />} />
        <Route path="page-content" element={<AdminPageContent />} />
        <Route path="id-cards" element={<AdminIDCards />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="footer" element={<AdminFooter />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="training" element={<AdminTraining />} />
        <Route path="centers" element={<AdminCenters />} />
        <Route path="schemes" element={<AdminSchemes />} />
        <Route path="loan" element={<AdminLoan />} />
        <Route path="employment" element={<AdminEmployment />} />
        <Route path="rewards" element={<AdminRewards />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="franchise" element={<AdminFranchise />} />
        <Route path="franchise-partners" element={<AdminFranchisePartners />} />
        <Route path="internship" element={<AdminInternship />} />
        <Route path="b2b" element={<AdminB2BPlans />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="legal-docs" element={<AdminLegalDocs />} />
        <Route path="wishes" element={<AdminWishes />} />
        <Route path="our-team" element={<AdminOurTeam />} />
        <Route path="our-partners" element={<AdminOurPartners />} />
        <Route path="youtube" element={<AdminYouTube />} />
        <Route path="slider" element={<AdminSlider />} />
        <Route path="official-letters" element={<AdminOfficialLetters />} />
        <Route path="transport" element={<AdminTransport />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // PWA install prompt
    let deferredPrompt: (Event & { prompt?: () => void }) | null = null;
    const handler = (e: Event) => {
      deferredPrompt = e as typeof deferredPrompt;
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    const timer = setTimeout(() => {
      if (deferredPrompt?.prompt) deferredPrompt.prompt();
    }, 3000);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener,
      );
      clearTimeout(timer);
    };
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <LanguageSwitcher />
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </AppProvider>
  );
}

import type React from "react";
