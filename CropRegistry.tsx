import { useListCrops, getListCropsQueryKey, useCreateCrop, useDeleteCrop } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge } from "@/components/ui/core";
import { Plus, Trash2, Sprout, Calendar } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function CropRegistry() {
  const queryClient = useQueryClient();
  const { data: crops, isLoading } = useListCrops({ query: { queryKey: getListCropsQueryKey() }});
  const createCrop = useCreateCrop();
  const deleteCrop = useDeleteCrop();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    variety: "",
    season: "Kharif",
    area: "",
    areaUnit: "Acres",
    sowingDate: "",
    status: "Active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCrop.mutate({ 
      data: {
        ...formData,
        area: Number(formData.area),
      }
    }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() });
        setFormData({ name: "", variety: "", season: "Kharif", area: "", areaUnit: "Acres", sowingDate: "", status: "Active" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if(confirm("Delete this crop?")) {
      deleteCrop.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListCropsQueryKey() })
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Crop Registry</h1>
          <p className="text-muted-foreground mt-1">Manage your active and past crops.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          {isAdding ? "Cancel" : <><Plus size={18} /> Add Crop</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Crop Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Paddy, Cotton" />
              </div>
              <div className="space-y-2">
                <Label>Variety</Label>
                <Input value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} placeholder="e.g. BPT 5204" />
              </div>
              <div className="space-y-2">
                <Label>Season</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.season} onChange={e => setFormData({...formData, season: e.target.value})}>
                  <option>Kharif</option>
                  <option>Rabi</option>
                  <option>Zaid</option>
                  <option>Annual</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Area</Label>
                <div className="flex gap-2">
                  <Input required type="number" step="0.1" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
                  <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.areaUnit} onChange={e => setFormData({...formData, areaUnit: e.target.value})}>
                    <option>Acres</option>
                    <option>Hectares</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sowing Date</Label>
                <Input required type="date" value={formData.sowingDate} onChange={e => setFormData({...formData, sowingDate: e.target.value})} />
              </div>
              <div className="space-y-2 flex items-end">
                <Button type="submit" className="w-full" disabled={createCrop.isPending}>
                  {createCrop.isPending ? "Saving..." : "Save Crop"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops?.map(crop => (
            <Card key={crop.id} className="relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant={crop.status === 'Active' ? 'default' : 'secondary'}>{crop.status}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Sprout size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-1">{crop.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{crop.variety || 'Standard Variety'} • {crop.season}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{crop.area} {crop.areaUnit}</span>
                  </div>
                  {crop.sowingDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sown</span>
                      <span className="font-medium flex items-center gap-1"><Calendar size={12}/> {formatDate(crop.sowingDate)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(crop.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {crops?.length === 0 && !isAdding && (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              <Sprout className="mx-auto h-12 w-12 opacity-20 mb-3" />
              <p className="font-medium text-lg">No crops planted</p>
              <p className="text-sm mt-1">Add your first crop to start tracking.</p>
              <Button variant="outline" className="mt-4" onClick={() => setIsAdding(true)}>Add Crop</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
