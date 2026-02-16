import { useState, useEffect } from 'react';
import { useGetProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileEditor() {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setBio(profile.bio);
      setEmail(profile.email);
      setPhone(profile.phone || '');
      setSocialLinks(profile.socialLinks || []);
    }
  }, [profile]);

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, '']);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim() || !bio.trim() || !email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const filteredLinks = socialLinks.filter((link) => link.trim() !== '');

    try {
      await updateProfile.mutateAsync({
        displayName: displayName.trim(),
        bio: bio.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        socialLinks: filteredLinks,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name *</Label>
        <Input
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell visitors about yourself and your work..."
          rows={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Social Links (optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddSocialLink}>
            <Plus className="h-4 w-4 mr-1" />
            Add Link
          </Button>
        </div>

        {socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={link}
              onChange={(e) => handleSocialLinkChange(index, e.target.value)}
              placeholder="https://..."
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSocialLink(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={updateProfile.isPending} className="w-full">
        {updateProfile.isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Profile'
        )}
      </Button>
    </form>
  );
}

