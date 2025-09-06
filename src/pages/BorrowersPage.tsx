import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StoryCard from '@/components/StoryCard';
import { Search, Filter } from 'lucide-react';
import { mockBorrowers } from '@/data/mockData';

const BorrowersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredBorrowers = mockBorrowers.filter(borrower => {
    const matchesSearch = borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrower.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrower.story.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || borrower.businessType.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || borrower.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'textile', label: 'Textile & Clothing' },
    { value: 'food', label: 'Food & Catering' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'retail', label: 'Retail & Trading' },
    { value: 'services', label: 'Services' },
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Support Small Businesses</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover inspiring entrepreneurs across India who are building sustainable businesses 
            and creating positive change in their communities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, business, or story..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredBorrowers.length} of {mockBorrowers.length} borrowers
          </p>
        </div>

        {/* Borrower Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBorrowers.map((borrower) => (
            <StoryCard key={borrower.id} borrower={borrower} />
          ))}
        </div>

        {filteredBorrowers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No borrowers match your current filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        {filteredBorrowers.length > 0 && (
          <div className="text-center mt-16 py-12 bg-secondary/30 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our community of lenders and help small business owners achieve their dreams 
              while earning competitive returns on your investment.
            </p>
            <Button variant="hero" size="lg">
              Start Lending Today
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowersPage;