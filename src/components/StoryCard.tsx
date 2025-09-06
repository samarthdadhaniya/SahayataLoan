import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import MoneyTransferModal from './MoneyTransferModal';
import { useAuth } from '@/contexts/AuthContext';

interface StoryCardProps {
  borrower: any;
  compact?: boolean;
  showSendMoney?: boolean;
  lenderId?: string;
}

const StoryCard = ({ borrower, compact = false, showSendMoney = false, lenderId }: StoryCardProps) => {
  const { user } = useAuth();
  const [showTransferModal, setShowTransferModal] = useState(false);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount);

  return (
    <div>
      <Card className="overflow-hidden hover:shadow-accent transition-all duration-300 hover:scale-[1.02] group">
        <div className="relative">
          <img 
            src={borrower.image_url || '/placeholder.svg'} 
            alt={borrower.business_name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {borrower.ngo_verified && (
              <Badge className="bg-success text-success-foreground">
                Verified
              </Badge>
            )}
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {borrower.trust_score || 0}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge 
              variant={borrower.loan_status === 'funded' ? 'default' : 'secondary'}
              className={borrower.loan_status === 'funded' ? 'bg-success' : ''}
            >
              {borrower.loan_status === 'funded' ? 'Fully Funded' : 'Funding Active'}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">{borrower.business_name}</h3>
              <p className="text-muted-foreground text-sm">by {borrower.profiles?.full_name || 'Borrower'}</p>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="h-3 w-3" />
                {borrower.region || borrower.address || 'Location not specified'}
              </div>
            </div>
            <Badge variant="outline">{borrower.business_type}</Badge>
          </div>

          <p className={`text-muted-foreground mb-4 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
            {borrower.business_description || borrower.loan_purpose || 'No description available'}
          </p>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Funding Goal</span>
              <span className="font-semibold">{formatCurrency(borrower.loan_amount)}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round((borrower.funded_amount || 0) / borrower.loan_amount * 100)}%</span>
              </div>
              <Progress value={(borrower.funded_amount || 0) / borrower.loan_amount * 100} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(borrower.funded_amount || 0)} raised</span>
                <span>{formatCurrency(borrower.loan_amount - (borrower.funded_amount || 0))} remaining</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>12% APR</span>
                </div>
                <span>12 months</span>
              </div>
              {showSendMoney && lenderId ? (
                <Button 
                  variant="hero" 
                  size="sm"
                  onClick={() => setShowTransferModal(true)}
                  disabled={borrower.loan_status === 'funded'}
                >
                  {borrower.loan_status === 'funded' ? 'Funded' : 'Send Money'}
                </Button>
              ) : (
                <Link to={`/borrower/${borrower.id}`}>
                  <Button 
                    variant={borrower.loan_status === 'funded' ? 'secondary' : 'hero'} 
                    size="sm"
                    disabled={borrower.loan_status === 'funded'}
                  >
                    {borrower.loan_status === 'funded' ? 'View Details' : 'View Profile'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showSendMoney && lenderId && (
        <MoneyTransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          borrower={borrower}
          lenderId={lenderId}
        />
      )}
    </div>
  );
};

export default StoryCard;