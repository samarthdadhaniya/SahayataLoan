import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, TrendingUp, Heart, Calendar, Users, IndianRupee, Star } from 'lucide-react';
import { mockLenders } from '@/data/mockData';

const LenderProfilePage = () => {
  const { id } = useParams();
  
  // Mock data - in real app, fetch by ID
  const lender = mockLenders.find(l => l.id === id) || mockLenders[0];

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
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock portfolio data
  const portfolio = [
    {
      id: '1',
      borrowerName: 'Priya Sharma',
      businessName: 'Priya\'s Textiles',
      amountLent: 15000,
      interestRate: 12.5,
      status: 'active',
      progress: 80,
      monthsRemaining: 14
    },
    {
      id: '2',
      borrowerName: 'Amit Patel',
      businessName: 'Amit\'s Street Food',
      amountLent: 10000,
      interestRate: 13.0,
      status: 'active',
      progress: 25,
      monthsRemaining: 32
    },
    {
      id: '3',
      borrowerName: 'Kavita Reddy',
      businessName: 'Kavita\'s Tailoring',
      amountLent: 8000,
      interestRate: 11.5,
      status: 'completed',
      progress: 100,
      monthsRemaining: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/lenders" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lenders
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <img 
                    src={lender.avatar} 
                    alt={lender.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{lender.name}</h1>
                      <Badge className="bg-success text-success-foreground">
                        Verified Lender
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Member since {formatDate(lender.joinDate)}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <IndianRupee className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="font-semibold">{formatCurrency(lender.totalLent)}</div>
                        <div className="text-xs text-muted-foreground">Total Lent</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="font-semibold">{lender.activeLenders}</div>
                        <div className="text-xs text-muted-foreground">Active Loans</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
                        <div className="font-semibold">{formatCurrency(lender.repaymentReceived)}</div>
                        <div className="text-xs text-muted-foreground">Returns</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/50 rounded-lg">
                        <Heart className="h-5 w-5 text-primary mx-auto mb-1" />
                        <div className="font-semibold">{lender.socialImpact}</div>
                        <div className="text-xs text-muted-foreground">Lives Impacted</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Current and past lending activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolio.map((investment) => (
                  <div key={investment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{investment.businessName}</h3>
                        <p className="text-sm text-muted-foreground">by {investment.borrowerName}</p>
                      </div>
                      <Badge 
                        variant={investment.status === 'completed' ? 'secondary' : 'default'}
                        className={investment.status === 'completed' ? 'bg-success' : ''}
                      >
                        {investment.status === 'completed' ? 'Completed' : 'Active'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount Lent</p>
                        <p className="font-medium">{formatCurrency(investment.amountLent)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{investment.interestRate}% APR</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Progress</p>
                        <p className="font-medium">{investment.progress}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time Remaining</p>
                        <p className="font-medium">
                          {investment.monthsRemaining === 0 ? 'Completed' : `${investment.monthsRemaining} months`}
                        </p>
                      </div>
                    </div>
                    
                    {investment.status === 'active' && (
                      <Progress value={investment.progress} className="h-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Impact Story */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Story</CardTitle>
                <CardDescription>How {lender.name} is making a difference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {lender.name} has been a dedicated member of our lending community, consistently supporting 
                    small businesses across India. Their investment in {lender.preferredSectors.join(', ')} 
                    has helped create sustainable economic opportunities in underserved communities.
                  </p>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Recent Impact Highlights</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Helped Priya's Textiles employ 3 additional women artisans</li>
                      <li>• Supported Amit's expansion from street cart to permanent location</li>
                      <li>• Contributed to 15 families improving their monthly income by 40%</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Lending Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-success" />
                    <span className="font-semibold">96%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Avg. Return</span>
                  <span className="font-semibold text-success">12.8%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Auto-Invest</span>
                  <Badge variant={lender.autoInvestEnabled ? 'default' : 'secondary'}>
                    {lender.autoInvestEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Sectors */}
            <Card>
              <CardHeader>
                <CardTitle>Preferred Sectors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lender.preferredSectors.map((sector, index) => (
                    <Badge key={index} variant="outline">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Connect with {lender.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in similar investment opportunities? Connect with experienced lenders like {lender.name}.
                </p>
                <Button variant="outline" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderProfilePage;