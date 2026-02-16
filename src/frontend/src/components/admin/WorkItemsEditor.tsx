import { useState } from 'react';
import { useGetAllWorkItems, useAddWorkItem, useDeleteWorkItem, useReorderWorkItems } from '@/hooks/useWorkItems';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2, Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { WorkItem } from '@/backend';
import { detectVideoProvider } from '@/lib/videoProviders';

export default function WorkItemsEditor() {
  const { data: workItems, isLoading } = useGetAllWorkItems();
  const addWorkItem = useAddWorkItem();
  const deleteWorkItem = useDeleteWorkItem();
  const reorderWorkItems = useReorderWorkItems();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [draggedItem, setDraggedItem] = useState<WorkItem | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    // Detect if the link is a video URL
    const trimmedLink = link.trim();
    let isVideo = false;
    if (trimmedLink) {
      const videoInfo = detectVideoProvider(trimmedLink);
      isVideo = videoInfo?.supported || false;
    }

    try {
      await addWorkItem.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        link: trimmedLink || undefined,
        isVideo,
      });
      toast.success('Work item added successfully');
      setTitle('');
      setDescription('');
      setLink('');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add work item');
      console.error(error);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this work item?')) {
      return;
    }

    try {
      await deleteWorkItem.mutateAsync(id);
      toast.success('Work item deleted');
    } catch (error) {
      toast.error('Failed to delete work item');
      console.error(error);
    }
  };

  const handleDragStart = (item: WorkItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (targetItem: WorkItem) => {
    if (!draggedItem || !workItems) return;

    const items = [...workItems];
    const draggedIndex = items.findIndex((item) => item.id === draggedItem.id);
    const targetIndex = items.findIndex((item) => item.id === targetItem.id);

    if (draggedIndex === targetIndex) return;

    items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, draggedItem);

    const newOrder = items.map((item) => item.id);

    try {
      await reorderWorkItems.mutateAsync(newOrder);
      toast.success('Work items reordered');
    } catch (error) {
      toast.error('Failed to reorder work items');
      console.error(error);
    }

    setDraggedItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {workItems?.length || 0} work item{workItems?.length !== 1 ? 's' : ''}
        </p>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Work Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Work Item</DialogTitle>
              <DialogDescription>Add a new project to your portfolio</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your work..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Video Link (YouTube, Vimeo, etc.)</Label>
                <Input
                  id="link"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <Button type="submit" disabled={addWorkItem.isPending} className="w-full">
                {addWorkItem.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Work Item'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {workItems && workItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No work items yet. Add your first project!</p>
        </div>
      )}

      <div className="space-y-4">
        {workItems?.map((item) => (
          <Card
            key={item.id.toString()}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(item)}
            className="cursor-move hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <CardTitle className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{item.title}</span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteWorkItem.isPending}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardTitle>
            </CardHeader>
            {item.description && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
