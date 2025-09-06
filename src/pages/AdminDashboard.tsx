import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Eye,
  Filter,
  Calendar
} from 'lucide-react';
import { mockLoanApplications } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  const handleApproveApplication = (applicationId: string) => {
    toast({
      title: "Application Approved",
      description: "The loan application has been approved and is now live for lenders.",
    });
  };

  const handleRejectApplication = (applicationId: string) => {
    toast({
      title: "Application Rejected",
      description: "The loan application has been rejected. The borrower will be notified.",
      variant: "destructive"
    });
  };

  const platformStats = {
    totalUsers: 3200,
    activeLenders: 800,
    activeBorrowers: 2400,
    totalFunded: 12000000,
    pendingApplications: 15,
    activeLoans: 145,
    repaymentRate: 94.2,
    monthlyGrowth: 18.5
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor platform performance and manage loan applications.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Total Users</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{platformStats.monthlyGrowth}% this month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Total Funded</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(platformStats.totalFunded)}</div>
                  <p className="text-xs text-muted-foreground">
                    Across {platformStats.activeLoans} loans
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Repayment Rate</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{platformStats.repaymentRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    Industry leading
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="text-sm font-medium">Pending Review</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{platformStats.pendingApplications}</div>
                  <p className="text-xs text-muted-foreground">
                    Applications awaiting review
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
              <CardDescription>Latest actions and updates across the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New borrower application approved: Kavita Reddy</p>
                  <p className="text-xs text-muted-foreground">₹75,000 tailoring business loan • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Large lender joined: Dr. Anita Desai</p>
                  <p className="text-xs text-muted-foreground">₹2,00,000 initial commitment • 4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Loan fully funded: Priya's Textiles</p>
                  <p className="text-xs text-muted-foreground">₹1,50,000 expansion loan completed • 6 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Loan Applications</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {mockLoanApplications.map((application) => (
              <Card key={application.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{application.businessName}</h3>
                      <p className="text-muted-foreground">by {application.borrowerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Submitted on {application.submittedDate}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={application.status === 'pending' ? 'secondary' : 'default'}
                      className={application.status === 'pending' ? 'bg-warning text-warning-foreground' : ''}
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-semibold">{formatCurrency(application.loanAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purpose</p>
                      <p className="font-semibold">{application.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Assessment</p>
                      <div className="flex items-center gap-1">
                        <Badge 
                          variant={
                            application.riskAssessment?.overallRisk === 'low' ? 'default' :
                            application.riskAssessment?.overallRisk === 'medium' ? 'secondary' : 'destructive'
                          }
                          className={
                            application.riskAssessment?.overallRisk === 'low' ? 'bg-success' : ''
                          }
                        >
                          {application.riskAssessment?.overallRisk || 'Pending'} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {application.riskAssessment && (
                    <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-2">Risk Assessment Details</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Credit Score</p>
                          <p className="font-medium">{application.riskAssessment.creditScore}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Business Viability</p>
                          <p className="font-medium">{application.riskAssessment.businessViability}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Market Demand</p>
                          <p className="font-medium">{application.riskAssessment.marketDemand}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApproveApplication(application.id)}
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRejectApplication(application.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Lenders</span>
                  <span className="font-semibold">{platformStats.activeLenders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Borrowers</span>
                  <span className="font-semibold">{platformStats.activeBorrowers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Growth</span>
                  <span className="font-semibold text-success">+{platformStats.monthlyGrowth}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Loans</span>
                  <span className="font-semibold">{platformStats.activeLoans}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Repayment Rate</span>
                  <span className="font-semibold text-success">{platformStats.repaymentRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Default Rate</span>
                  <span className="font-semibold">{(100 - platformStats.repaymentRate).toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create detailed reports for analysis and compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span>Financial Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>User Analytics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <AlertCircle className="h-6 w-6 mb-2" />
                  <span>Risk Assessment</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <span>Compliance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;