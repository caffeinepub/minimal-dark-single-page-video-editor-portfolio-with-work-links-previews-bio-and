import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileEditor from './ProfileEditor';
import WorkItemsEditor from './WorkItemsEditor';
import { Settings } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <section className="px-6 py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Admin Panel</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Your Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile & Contact</TabsTrigger>
                <TabsTrigger value="work">Work Items</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <ProfileEditor />
              </TabsContent>

              <TabsContent value="work" className="mt-6">
                <WorkItemsEditor />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

