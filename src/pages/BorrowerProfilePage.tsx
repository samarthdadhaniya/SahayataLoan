import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Star, TrendingUp, Calendar, Heart, ArrowLeft, IndianRupee, Users, CheckCircle, MessageSquare } from 'lucide-react';
import { mockBorrowers } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import borrowerStory1 from '@/assets/borrower-story-1.jpg';
import borrowerStory2 from '@/assets/borrower-story-2.jpg';
import borrowerStory3 from '@/assets/borrower-story-3.jpg';

const BorrowerProfilePage = () => {
  const { id } = useParams();
  const [lendAmount, setLendAmount] = useState('');
  const [isLendingDialogOpen, setIsLendingDialogOpen] = useState(false);
  
  // Mock data - in real app, fetch by ID
  const borrower = mockBorrowers.find(b => b.id === id) || mockBorrowers[0];

  // Map borrower images to actual imported images
  const imageMap: { [key: string]: string } = {
    '1': borrowerStory1,
    '2': borrowerStory2,
    '3': borrowerStory3
  };

  const actualImage = imageMap[borrower.id] || borrowerStory1;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  const handleLend = () => {
    if (!lendAmount || Number(lendAmount) < 500) {
      toast({
        title: "Invalid Amount",
        description: "Minimum lending amount is ₹500",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Lending Successful!",
      description: `You have successfully lent ₹${lendAmount} to ${borrower.name}`,
    });
    
    setIsLendingDialogOpen(false);
    setLendAmount('');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/borrowers" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Borrowers
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={actualImage} 
                  alt={borrower.businessName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{borrower.businessName}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{borrower.location}</span>
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {borrower.businessType}
                    </Badge>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  {borrower.isVerified && (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {borrower.trustScore}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Story */}
            <Card>
              <CardHeader>
                <CardTitle>About {borrower.name}'s Business</CardTitle>
                <CardDescription>Learn about their journey and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {borrower.story}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{borrower.yearsInBusiness} Years</div>
                    <div className="text-sm text-muted-foreground">In Business</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <IndianRupee className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{formatCurrency(borrower.monthlyIncome)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Income</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/50 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold">{borrower.interestRate}%</div>
                    <div className="text-sm text-muted-foreground">Interest Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Community Testimonials</CardTitle>
                <CardDescription>What others say about {borrower.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {borrower.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <p className="text-muted-foreground mb-2">"{testimonial.comment}"</p>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="font-medium">{testimonial.name}</span>
                      <span className="text-sm text-muted-foreground">- {testimonial.relation}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Progress</CardTitle>
                <CardDescription>Help {borrower.name} reach their goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(borrower.totalFunded)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of {formatCurrency(borrower.loanAmount)} goal
                  </div>
                </div>

                <Progress value={borrower.fundingProgress} className="h-3" />
                
                <div className="flex justify-between text-sm">
                  <span>{borrower.fundingProgress}% Complete</span>
                  <span>{formatCurrency(borrower.loanAmount - borrower.totalFunded)} remaining</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-semibold">24</div>
                    <div className="text-xs text-muted-foreground">Lenders</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                    <div className="font-semibold">{borrower.repaymentTerm}m</div>
                    <div className="text-xs text-muted-foreground">Term</div>
                  </div>
                </div>

                {borrower.status === 'funded' ? (
                  <Button disabled className="w-full">
                    Fully Funded
                  </Button>
                ) : (
                  <Dialog open={isLendingDialogOpen} onOpenChange={setIsLendingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="hero" className="w-full" size="lg">
                        <Heart className="h-4 w-4 mr-2" />
                        Lend Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Lend to {borrower.name}</DialogTitle>
                        <DialogDescription>
                          Support {borrower.businessName} and earn {borrower.interestRate}% annual returns
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Lending Amount (₹)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="Minimum ₹500"
                            value={lendAmount}
                            onChange={(e) => setLendAmount(e.target.value)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Monthly returns: ₹{lendAmount ? Math.round(Number(lendAmount) * borrower.interestRate / 100 / 12) : 0}
                          </p>
                        </div>
                        <Button onClick={handleLend} className="w-full" variant="hero">
                          Confirm Lending
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* Loan Details */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Purpose:</span>
                  <span className="font-medium">{borrower.loanPurpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-medium">{borrower.interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Repayment Term:</span>
                  <span className="font-medium">{borrower.repaymentTerm} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Risk Score:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-success" />
                    <span className="font-medium">{borrower.riskScore}/10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerProfilePage;