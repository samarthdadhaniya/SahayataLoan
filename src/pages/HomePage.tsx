import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StoryCard from '@/components/StoryCard';
import { ArrowRight, Heart, Shield, TrendingUp, Users } from 'lucide-react';
import { mockBorrowers } from '@/data/mockData';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const HomePage = () => {
  const featuredBorrowers = mockBorrowers.slice(0, 3);

  const stats = [
    { icon: Users, label: 'Active Borrowers', value: '2,500+' },
    { icon: Heart, label: 'Total Funded', value: '₹1.2 Cr' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%' },
    { icon: Shield, label: 'Verified Lenders', value: '800+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Empowering Dreams,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white">
                Building Communities
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100 animate-slide-up">
              Connect with small business owners across India. Lend with purpose, 
              borrow with dignity, and create lasting social impact together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link to="/register">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Start Lending
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
                >
                  Apply for Loan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-soft transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the incredible entrepreneurs who are transforming their communities 
              with the support of our lending community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredBorrowers.map((borrower) => (
              <StoryCard key={borrower.id} borrower={borrower} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/borrowers">
              <Button variant="accent" size="lg">
                View All Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How SahayataLoan Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process that connects lenders with borrowers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-accent transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Browse & Discover</h3>
                <p className="text-muted-foreground">
                  Explore verified borrower profiles, read their stories, and choose 
                  who to support based on your values and interests.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-accent transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Lend with Confidence</h3>
                <p className="text-muted-foreground">
                  Make secure loans starting from ₹500. Track your impact and 
                  receive regular updates from borrowers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-accent transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">See Real Impact</h3>
                <p className="text-muted-foreground">
                  Watch businesses grow, communities thrive, and receive your 
                  repayments while making a lasting difference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of lenders who are creating positive change in communities across India.
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 bg-white text-primary hover:bg-orange-50">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;