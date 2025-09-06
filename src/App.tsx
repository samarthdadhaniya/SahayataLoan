import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import BorrowersPage from "./pages/BorrowersPage";
import LendersPage from "./pages/LendersPage";
import BorrowerProfilePage from "./pages/BorrowerProfilePage";
import LenderProfilePage from "./pages/LenderProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/borrowers" element={<BorrowersPage />} />
            <Route path="/lenders" element={<LendersPage />} />
            <Route path="/borrower/:id" element={<BorrowerProfilePage />} />
            <Route path="/lender/:id" element={<LenderProfilePage />} />
            <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
            <Route path="/lender-dashboard" element={<LenderDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
