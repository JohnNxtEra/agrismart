import { useListDiaryEntries, getListDiaryEntriesQueryKey, useCreateDiaryEntry, useDeleteDiaryEntry } from "@workspace/api-client-react";
import { Card, CardContent, Button, Input, Label, Textarea, Badge } from "@/components/ui/core";
import { BookOpen, Plus, Trash2, CloudSun, Leaf, Sprout, Target } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function FarmDiary() {
  const queryClient = useQueryClient();
  const { data: entries, isLoading } = useListDiaryEntries({ query: { queryKey: getListDiaryEntriesQueryKey() }});
  const createEntry = useCreateDiaryEntry();
  const deleteEntry = useDeleteDiaryEntry();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Observation",
    weather: "Sunny",
    entryDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEntry.mutate({ data: formData }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListDiaryEntriesQueryKey() });
        setFormData({ ...formData, title: "", content: "" });
      }
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'Weather': return <CloudSun size={18} />;
      case 'Treatment': return <Target size={18} />;
      case 'Harvest': return <Sprout size={18} />;
      default: return <Leaf size={18} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Farm Diary</h1>
          <p className="text-muted-foreground mt-1">Record observations, treatments, and daily notes.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          {isAdding ? "Cancel" : <><Plus size={18} /> New Entry</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-card shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Title</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Applied Neem Oil to Cotton" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input required type="date" value={formData.entryDate} onChange={e => setFormData({...formData, entryDate: e.target.value})} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Observation</option>
                    <option>Treatment</option>
                    <option>Weather</option>
                    <option>Harvest</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Weather Condition</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.weather} onChange={e => setFormData({...formData, weather: e.target.value})}>
                    <option>Sunny</option>
                    <option>Cloudy</option>
                    <option>Rainy</option>
                    <option>Windy</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea required className="min-h-[120px]" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Describe what you observed or did today..." />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={createEntry.isPending}>
                  {createEntry.isPending ? "Saving..." : "Save Entry"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="relative border-l-2 border-primary/20 ml-4 space-y-8 pl-8">
          {entries?.map(entry => (
            <div key={entry.id} className="relative">
              <div className="absolute -left-[42px] top-1 h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center border-4 border-background">
                {getCategoryIcon(entry.category)}
              </div>
              <Card className="hover:shadow-md transition-shadow group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="bg-muted text-muted-foreground">{formatDate(entry.entryDate)}</Badge>
                        <Badge variant="outline">{entry.category}</Badge>
                        {entry.weather && <Badge variant="outline" className="border-dashed"><CloudSun size={12} className="mr-1"/>{entry.weather}</Badge>}
                      </div>
                      <h3 className="font-serif text-xl font-bold">{entry.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-opacity" onClick={() => {
                      if(confirm('Delete entry?')) deleteEntry.mutate({ id: entry.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListDiaryEntriesQueryKey() }) })
                    }}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {entries?.length === 0 && !isAdding && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p className="font-medium text-lg">Your diary is empty</p>
              <p className="text-sm">Start recording your farm's history.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
