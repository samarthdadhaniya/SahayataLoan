import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StoryCard from '@/components/StoryCard';
import { TrendingUp, Users, IndianRupee, Heart, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useLenderProfile } from '@/hooks/useProfile';
import { mockBorrowers } from '@/data/mockData';

const LenderDashboard = () => {
  const { user } = useAuth();
  const { profile: userProfile } = useProfile();
  const { profile: lenderProfile } = useLenderProfile();
  
  const activeBorrowers = mockBorrowers.filter(b => b.status === 'active');
  
  const stats = {
    totalLent: 450000,
    activeLenders: 6,
    repaymentReceived: 125000,
    socialImpact: 15
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  const investments = [
    {
      id: '1',
      borrowerName: 'Priya Sharma',
      businessName: 'Priya\'s Textiles',
      amountLent: 15000,
      interestRate: 12.5,
      status: 'active',
      nextPayment: '2024-02-15',
      totalReturns: 2250
    },
    {
      id: '2',
      borrowerName: 'Amit Patel',
      businessName: 'Amit\'s Street Food',
      amountLent: 10000,
      interestRate: 13.0,
      status: 'active',
      nextPayment: '2024-02-20',
      totalReturns: 1800
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.full_name || user?.email}!</h1>
        <p className="text-muted-foreground">Track your lending portfolio and discover new opportunities.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="browse">Browse Borrowers</TabsTrigger>
          <TabsTrigger value="investments">My Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Total Lent</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(stats.totalLent)}</div>
                  <p className="text-xs text-muted-foreground">
                    Across {stats.activeLenders} borrowers
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Returns Received</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(stats.repaymentReceived)}</div>
                  <p className="text-xs text-muted-foreground">
                    27.8% of total lent
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Active Loans</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{stats.activeLenders}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently supporting
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Social Impact</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{stats.socialImpact}</div>
                  <p className="text-xs text-muted-foreground">
                    Lives impacted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest lending activities and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received from Priya Sharma</p>
                  <p className="text-xs text-muted-foreground">₹1,250 received • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New borrower available: Sunita & Raj Singh</p>
                  <p className="text-xs text-muted-foreground">Organic farming project • 1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Loan fully funded: Amit Patel</p>
                  <p className="text-xs text-muted-foreground">Street food expansion • 3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Available Borrowers</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBorrowers.map((borrower) => (
              <StoryCard 
                key={borrower.id} 
                borrower={borrower} 
                showSendMoney={true}
                lenderId={lenderProfile?.id}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <h2 className="text-2xl font-bold">My Investment Portfolio</h2>
          
          <div className="space-y-4">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{investment.businessName}</h3>
                      <p className="text-sm text-muted-foreground">by {investment.borrowerName}</p>
                    </div>
                    <Badge className="bg-success">Active</Badge>
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
                      <p className="text-muted-foreground">Next Payment</p>
                      <p className="font-medium">{investment.nextPayment}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Returns</p>
                      <p className="font-medium text-success">+{formatCurrency(investment.totalReturns)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LenderDashboard;