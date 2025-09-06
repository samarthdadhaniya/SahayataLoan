-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('lender', 'borrower')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lenders table
CREATE TABLE public.lenders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_lent DECIMAL(12, 2) DEFAULT 0,
  repayments_received DECIMAL(12, 2) DEFAULT 0,
  impact_score INTEGER DEFAULT 0,
  auto_invest BOOLEAN DEFAULT false,
  preferred_categories TEXT[],
  preferred_regions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create borrowers table
CREATE TABLE public.borrowers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  business_description TEXT,
  aadhaar_number TEXT,
  pan_number TEXT,
  loan_amount DECIMAL(10, 2) NOT NULL,
  loan_purpose TEXT,
  loan_status TEXT DEFAULT 'pending' CHECK (loan_status IN ('pending', 'approved', 'funded', 'repaid', 'rejected')),
  region TEXT,
  phone TEXT,
  address TEXT,
  image_url TEXT,
  video_url TEXT,
  trust_score INTEGER DEFAULT 0,
  ngo_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loans table for tracking lending relationships
CREATE TABLE public.loans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lender_id UUID NOT NULL REFERENCES public.lenders(id) ON DELETE CASCADE,
  borrower_id UUID NOT NULL REFERENCES public.borrowers(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) DEFAULT 0,
  duration_months INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'repaid', 'defaulted')),
  repaid_amount DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrowers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for lenders
CREATE POLICY "Everyone can view lenders" 
ON public.lenders 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own lender profile" 
ON public.lenders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lender profile" 
ON public.lenders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for borrowers
CREATE POLICY "Everyone can view borrowers" 
ON public.borrowers 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own borrower profile" 
ON public.borrowers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own borrower profile" 
ON public.borrowers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for loans
CREATE POLICY "Users can view loans they're involved in" 
ON public.loans 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.lenders WHERE lenders.id = loans.lender_id AND lenders.user_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.borrowers WHERE borrowers.id = loans.borrower_id AND borrowers.user_id = auth.uid()
  )
);

CREATE POLICY "Lenders can create loans" 
ON public.loans 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.lenders WHERE lenders.id = loans.lender_id AND lenders.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lenders_updated_at
  BEFORE UPDATE ON public.lenders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_borrowers_updated_at
  BEFORE UPDATE ON public.borrowers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loans_updated_at
  BEFORE UPDATE ON public.loans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'lender')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();