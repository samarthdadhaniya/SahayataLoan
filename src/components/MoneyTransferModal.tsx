import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MoneyTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  borrower: any;
  lenderId: string;
}

const MoneyTransferModal = ({ isOpen, onClose, borrower, lenderId }: MoneyTransferModalProps) => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('12');
  const [duration, setDuration] = useState('12');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Create loan record
      const { error: loanError } = await supabase
        .from('loans')
        .insert({
          lender_id: lenderId,
          borrower_id: borrower.id,
          amount: parseFloat(amount),
          interest_rate: parseFloat(interestRate),
          duration_months: parseInt(duration),
          status: 'active'
        });

      if (loanError) throw loanError;

      // Update lender's total_lent - get current value first
      const { data: currentLender } = await supabase
        .from('lenders')
        .select('total_lent')
        .eq('id', lenderId)
        .single();

      if (currentLender) {
        const newTotal = (currentLender.total_lent || 0) + parseFloat(amount);
        const { error: lenderError } = await supabase
          .from('lenders')
          .update({ total_lent: newTotal })
          .eq('id', lenderId);

        if (lenderError) throw lenderError;
      }

      toast({
        title: "Transfer Successful",
        description: `₹${amount} has been successfully transferred to ${borrower.profiles?.full_name || 'the borrower'}`,
      });

      onClose();
      setAmount('');
      setInterestRate('12');
      setDuration('12');
      
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Transfer error:', error);
      toast({
        title: "Transfer Failed",
        description: "There was an error processing the transfer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            Transfer money to {borrower.profiles?.full_name || 'borrower'} for their {borrower.business_name} project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="interest">Interest Rate (%)</Label>
              <Input
                id="interest"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="12"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleTransfer} disabled={loading} className="flex-1">
              {loading ? 'Processing...' : 'Send Money'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoneyTransferModal;