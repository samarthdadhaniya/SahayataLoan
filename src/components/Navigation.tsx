import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  UserCheck, 
  User, 
  LogOut, 
  Settings,
  HeartHandshake,
  LayoutDashboard
} from 'lucide-react';

const Navigation = () => {
  const { user, userProfile, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const getDashboardPath = () => {
    if (userProfile?.role === 'borrower') return '/borrower-dashboard';
    if (userProfile?.role === 'lender') return '/lender-dashboard';
    if (userProfile?.role === 'admin') return '/admin-dashboard';
    return '/borrower-dashboard';
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/borrowers', label: 'Borrowers', icon: Users },
    { path: '/lenders', label: 'Lenders', icon: UserCheck },
  ];

  if (!isAuthenticated) {
    return (
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <HeartHandshake className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-hero-gradient bg-clip-text text-transparent">
                SahayataLoan
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl bg-hero-gradient bg-clip-text text-transparent">
              SahayataLoan
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
            
            <Link to={getDashboardPath()}>
              <Button 
                variant={isActive(getDashboardPath()) ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">{userProfile?.full_name || user?.email}</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;