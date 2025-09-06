import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Settings, Bell, Shield, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userProfile?.full_name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    bio: 'Passionate about supporting small businesses and creating positive social impact.',
    preferredSectors: ['Healthcare', 'Education'],
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    autoInvest: false,
    maxAutoInvest: '5000'
  });

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleProfileChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and bio</CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary-gradient rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userProfile?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}</p>
                  <Badge className="mt-1 bg-success">Verified</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              {user?.role === 'lender' && (
                <div className="space-y-2">
                  <Label>Preferred Investment Sectors</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Healthcare', 'Education', 'Agriculture', 'Technology', 'Retail', 'Manufacturing'].map((sector) => (
                      <Badge
                        key={sector}
                        variant={profile.preferredSectors.includes(sector) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          if (!isEditing) return;
                          const newSectors = profile.preferredSectors.includes(sector)
                            ? profile.preferredSectors.filter(s => s !== sector)
                            : [...profile.preferredSectors, sector];
                          handleProfileChange('preferredSectors', newSectors);
                        }}
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Preferences</CardTitle>
              <CardDescription>Configure your investment and lending settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-Invest</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically invest in borrowers matching your criteria
                  </p>
                </div>
                <Switch
                  checked={profile.autoInvest}
                  onCheckedChange={(checked) => handleProfileChange('autoInvest', checked)}
                />
              </div>

              {profile.autoInvest && (
                <div className="space-y-2">
                  <Label htmlFor="maxAutoInvest">Maximum Auto-Investment Amount (₹)</Label>
                  <Input
                    id="maxAutoInvest"
                    type="number"
                    value={profile.maxAutoInvest}
                    onChange={(e) => handleProfileChange('maxAutoInvest', e.target.value)}
                    placeholder="5000"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your investments and new opportunities
                  </p>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get important updates via text message
                  </p>
                </div>
                <Switch
                  checked={profile.notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={profile.notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Payment Methods</p>
                      <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                <div className="space-y-2">
                  <Button variant="destructive" size="sm">
                    Deactivate Account
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Once you deactivate your account, there is no going back. Please be certain.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;