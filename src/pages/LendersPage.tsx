import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Calendar, Users } from 'lucide-react';
import { mockLenders } from '@/data/mockData';
import { Link } from 'react-router-dom';

const LendersPage = () => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Lending Community</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Meet the incredible individuals who are making a difference by supporting 
            small businesses across India. Join their mission to create economic opportunity.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">800+</div>
              <div className="text-sm text-muted-foreground">Active Lenders</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold">₹1.2 Cr</div>
              <div className="text-sm text-muted-foreground">Total Funded</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">2,500+</div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm text-muted-foreground">Repayment Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Lenders */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Lenders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockLenders.map((lender) => (
              <Card key={lender.id} className="overflow-hidden hover:shadow-accent transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={lender.avatar} 
                      alt={lender.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{lender.name}</h3>
                        <Badge variant="secondary">Verified</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Member since {formatDate(lender.joinDate)}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Lent</p>
                          <p className="font-semibold text-primary">{formatCurrency(lender.totalLent)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Loans</p>
                          <p className="font-semibold">{lender.activeLenders}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Returns Received</p>
                          <p className="font-semibold text-success">{formatCurrency(lender.repaymentReceived)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Social Impact</p>
                          <p className="font-semibold">{lender.socialImpact} lives</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Preferred Sectors</p>
                        <div className="flex flex-wrap gap-1">
                          {lender.preferredSectors.map((sector, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {lender.autoInvestEnabled && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Auto-Invest Enabled
                            </Badge>
                          )}
                        </div>
                        <Link to={`/lender/${lender.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Become a Lender */}
        <Card className="bg-hero-gradient text-white">
          <CardContent className="pt-8 pb-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Become a Lender Today</h2>
              <p className="text-xl text-orange-100 mb-8">
                Join our community of impact-driven lenders and help create economic 
                opportunities while earning competitive returns on your investment.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-white/10 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">1</div>
                  <h3 className="font-semibold mb-2">Sign Up</h3>
                  <p className="text-sm text-orange-100">
                    Create your account and complete our simple verification process.
                  </p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">2</div>
                  <h3 className="font-semibold mb-2">Choose Borrowers</h3>
                  <p className="text-sm text-orange-100">
                    Browse verified borrower profiles and select those aligned with your values.
                  </p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-lg">
                  <div className="text-2xl font-bold mb-2">3</div>
                  <h3 className="font-semibold mb-2">Track Impact</h3>
                  <p className="text-sm text-orange-100">
                    Monitor your investments and see the real-world impact of your lending.
                  </p>
                </div>
              </div>
              
              <Link to="/register">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-orange-50">
                  Start Lending Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LendersPage;