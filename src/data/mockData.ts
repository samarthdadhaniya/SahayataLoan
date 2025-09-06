export interface BorrowerProfile {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  location: string;
  story: string;
  loanAmount: number;
  loanPurpose: string;
  riskScore: number;
  trustScore: number;
  repaymentTerm: number;
  interestRate: number;
  avatar: string;
  businessImages: string[];
  isVerified: boolean;
  totalFunded: number;
  status: 'active' | 'funded' | 'repaying' | 'completed';
  fundingProgress: number;
  monthlyIncome: number;
  yearsInBusiness: number;
  testimonials: Array<{
    name: string;
    relation: string;
    comment: string;
  }>;
}

export interface LenderProfile {
  id: string;
  name: string;
  totalLent: number;
  activeLenders: number;
  repaymentReceived: number;
  socialImpact: number;
  joinDate: string;
  preferredSectors: string[];
  autoInvestEnabled: boolean;
  avatar: string;
}

export interface LoanApplication {
  id: string;
  borrowerId: string;
  borrowerName: string;
  businessName: string;
  loanAmount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedDate?: string;
  riskAssessment?: {
    creditScore: number;
    businessViability: number;
    marketDemand: number;
    overallRisk: 'low' | 'medium' | 'high';
  };
}

export const mockBorrowers: BorrowerProfile[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    businessName: 'Priya\'s Textiles',
    businessType: 'Textile & Embroidery',
    location: 'Jaipur, Rajasthan',
    story: 'I have been running my textile business for 8 years, specializing in traditional Rajasthani embroidery. With this loan, I want to purchase new machinery and expand my workshop to employ 5 more women from my community.',
    loanAmount: 150000,
    loanPurpose: 'Equipment & Expansion',
    riskScore: 8.5,
    trustScore: 9.2,
    repaymentTerm: 24,
    interestRate: 12.5,
    avatar: '/api/placeholder/150/150',
    businessImages: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    isVerified: true,
    totalFunded: 120000,
    status: 'active',
    fundingProgress: 80,
    monthlyIncome: 25000,
    yearsInBusiness: 8,
    testimonials: [
      {
        name: 'Rajesh Kumar',
        relation: 'Supplier',
        comment: 'Priya is very reliable and always pays on time. Her work quality is excellent.'
      },
      {
        name: 'Local NGO Representative',
        relation: 'Community Verifier',
        comment: 'Priya has been a positive force in our community, employing local women.'
      }
    ]
  },
  {
    id: '2',
    name: 'Amit Patel',
    businessName: 'Amit\'s Street Food',
    businessType: 'Food & Catering',
    location: 'Ahmedabad, Gujarat',
    story: 'My street food cart has been serving authentic Gujarati snacks for 5 years. I want to expand to a small restaurant and create jobs for my family members.',
    loanAmount: 200000,
    loanPurpose: 'Restaurant Setup',
    riskScore: 7.8,
    trustScore: 8.9,
    repaymentTerm: 36,
    interestRate: 13.0,
    avatar: '/api/placeholder/150/150',
    businessImages: ['/api/placeholder/400/300'],
    isVerified: true,
    totalFunded: 50000,
    status: 'active',
    fundingProgress: 25,
    monthlyIncome: 18000,
    yearsInBusiness: 5,
    testimonials: [
      {
        name: 'Regular Customer',
        relation: 'Customer',
        comment: 'Best dhokla in the area! Amit is hardworking and honest.'
      }
    ]
  },
  {
    id: '3',
    name: 'Sunita & Raj Singh',
    businessName: 'Green Valley Farms',
    businessType: 'Organic Farming',
    location: 'Dehradun, Uttarakhand',
    story: 'We are a young couple passionate about organic farming. We want to expand our vegetable production and supply to local markets and restaurants.',
    loanAmount: 100000,
    loanPurpose: 'Farm Equipment & Seeds',
    riskScore: 8.0,
    trustScore: 9.0,
    repaymentTerm: 18,
    interestRate: 11.5,
    avatar: '/api/placeholder/150/150',
    businessImages: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    isVerified: true,
    totalFunded: 100000,
    status: 'funded',
    fundingProgress: 100,
    monthlyIncome: 15000,
    yearsInBusiness: 3,
    testimonials: [
      {
        name: 'Local Restaurant Owner',
        relation: 'Buyer',
        comment: 'Their organic vegetables are the freshest in the market.'
      }
    ]
  }
];

export const mockLenders: LenderProfile[] = [
  {
    id: '1',
    name: 'Dr. Anita Desai',
    totalLent: 450000,
    activeLenders: 6,
    repaymentReceived: 125000,
    socialImpact: 15,
    joinDate: '2023-01-15',
    preferredSectors: ['Healthcare', 'Education', 'Women Empowerment'],
    autoInvestEnabled: true,
    avatar: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Rajesh Mehta',
    totalLent: 280000,
    activeLenders: 4,
    repaymentReceived: 95000,
    socialImpact: 8,
    joinDate: '2023-03-22',
    preferredSectors: ['Agriculture', 'Food Processing'],
    autoInvestEnabled: false,
    avatar: '/api/placeholder/150/150'
  }
];

export const mockLoanApplications: LoanApplication[] = [
  {
    id: '1',
    borrowerId: '4',
    borrowerName: 'Kavita Reddy',
    businessName: 'Kavita\'s Tailoring',
    loanAmount: 75000,
    purpose: 'Sewing machines and fabric inventory',
    status: 'pending',
    submittedDate: '2024-01-15',
    riskAssessment: {
      creditScore: 720,
      businessViability: 85,
      marketDemand: 90,
      overallRisk: 'low'
    }
  },
  {
    id: '2',
    borrowerId: '5',
    borrowerName: 'Mohammed Khan',
    businessName: 'Khan Electronics',
    loanAmount: 125000,
    purpose: 'Inventory and shop renovation',
    status: 'pending',
    submittedDate: '2024-01-10',
    riskAssessment: {
      creditScore: 680,
      businessViability: 75,
      marketDemand: 80,
      overallRisk: 'medium'
    }
  }
];