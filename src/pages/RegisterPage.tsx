import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { HeartHandshake, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('lender');
  const [loading, setLoading] = useState(false);
  const { register, userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      // Redirect based on user role
      switch (userProfile.role) {
        case 'borrower':
          navigate('/borrower-dashboard');
          break;
        case 'lender':
          navigate('/lender-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const { error } = await register(name, email, password, role);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome to SahayataLoan!",
        description: "Please check your email to verify your account.",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <HeartHandshake className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Join SahayataLoan</CardTitle>
          <CardDescription>
            Create your account and start making a difference
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={role === 'lender' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRole('lender')}
                >
                  Lend Money
                </Button>
                <Button
                  type="button"
                  variant={role === 'borrower' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRole('borrower')}
                >
                  Borrow Money
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" variant="hero" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;