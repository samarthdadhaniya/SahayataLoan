import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, IndianRupee, Calendar, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useBorrowerProfile } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

const BorrowerDashboard = () => {
  const { user } = useAuth();
  const { profile: userProfile } = useProfile();
  const { profile: borrowerProfile } = useBorrowerProfile();
  const [applicationForm, setApplicationForm] = useState({
    businessName: '',
    businessType: '',
    location: '',
    loanAmount: '',
    loanPurpose: '',
    monthlyIncome: '',
    yearsInBusiness: '',
    story: '',
    aadhaar: '',
    pan: ''
  });

  const handleFormChange = (field: string, value: string) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Your loan application has been submitted for review. You'll hear back within 3-5 business days.",
    });
    // In real app, this would submit to API
  };

  const mockLoanStatus = {
    status: 'active' as const,
    amount: 150000,
    funded: 120000,
    progress: 80,
    lenders: 24,
    monthlyPayment: 8500,
    nextPaymentDate: '2024-02-15',
    totalRepaid: 25500,
    remainingBalance: 124500
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.full_name || user?.email}!</h1>
        <p className="text-muted-foreground">Manage your loan applications and track your business growth.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Current Loan</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(mockLoanStatus.amount)}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(mockLoanStatus.funded)} funded
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Funding Progress</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{mockLoanStatus.progress}%</div>
                  <p className="text-xs text-muted-foreground">
                    {mockLoanStatus.lenders} lenders supporting
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Next Payment</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(mockLoanStatus.monthlyPayment)}</div>
                  <p className="text-xs text-muted-foreground">
                    Due on {mockLoanStatus.nextPaymentDate}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Total Repaid</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{formatCurrency(mockLoanStatus.totalRepaid)}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(mockLoanStatus.remainingBalance)} remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Loan Status</CardTitle>
              <CardDescription>Track your current loan funding and repayment progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Funding Progress</span>
                <Badge className="bg-success">{mockLoanStatus.progress}% Complete</Badge>
              </div>
              <Progress value={mockLoanStatus.progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(mockLoanStatus.funded)} raised</span>
                <span>{formatCurrency(mockLoanStatus.amount - mockLoanStatus.funded)} remaining</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Repayment Schedule</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(mockLoanStatus.monthlyPayment)}/month for 18 months
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Interest Rate</p>
                  <p className="text-sm text-muted-foreground">12.5% APR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apply for a New Loan</CardTitle>
              <CardDescription>
                Fill out this form to apply for funding for your business. All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Your business name"
                      value={applicationForm.businessName}
                      onChange={(e) => handleFormChange('businessName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={applicationForm.businessType} onValueChange={(value) => handleFormChange('businessType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="textile">Textile & Clothing</SelectItem>
                        <SelectItem value="food">Food & Catering</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="retail">Retail & Trading</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={applicationForm.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="50000"
                      value={applicationForm.loanAmount}
                      onChange={(e) => handleFormChange('loanAmount', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Input
                    id="loanPurpose"
                    placeholder="Equipment, inventory, expansion, etc."
                    value={applicationForm.loanPurpose}
                    onChange={(e) => handleFormChange('loanPurpose', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="25000"
                      value={applicationForm.monthlyIncome}
                      onChange={(e) => handleFormChange('monthlyIncome', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Input
                      id="yearsInBusiness"
                      type="number"
                      placeholder="5"
                      value={applicationForm.yearsInBusiness}
                      onChange={(e) => handleFormChange('yearsInBusiness', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      placeholder="1234 5678 9012"
                      value={applicationForm.aadhaar}
                      onChange={(e) => handleFormChange('aadhaar', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      placeholder="ABCDE1234F"
                      value={applicationForm.pan}
                      onChange={(e) => handleFormChange('pan', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Your Story</Label>
                  <Textarea
                    id="story"
                    placeholder="Tell lenders about your business, your goals, and how this loan will help you grow..."
                    value={applicationForm.story}
                    onChange={(e) => handleFormChange('story', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Photos/Video</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Upload photos or a video of your business</p>
                    <Button variant="outline" type="button">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Priya's Textiles Expansion</h3>
                    <p className="text-sm text-muted-foreground">Applied on Jan 15, 2024</p>
                  </div>
                  <Badge className="bg-success">Active</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Amount:</span>
                    <span className="font-medium">₹1,50,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress:</span>
                    <span className="font-medium">80% (₹1,20,000)</span>
                  </div>
                  <Progress value={80} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Equipment Purchase Loan</h3>
                    <p className="text-sm text-muted-foreground">Applied on Dec 10, 2023</p>
                  </div>
                  <Badge variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Amount:</span>
                    <span className="font-medium">₹75,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <span className="font-medium text-success">Fully Repaid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BorrowerDashboard;