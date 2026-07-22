import { useListSoilAnalyses, getListSoilAnalysesQueryKey, useCreateSoilAnalysis } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label } from "@/components/ui/core";
import { TestTube, FlaskConical, Droplets, Leaf, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function SoilIntelligence() {
  const queryClient = useQueryClient();
  const { data: history, isLoading } = useListSoilAnalyses({ query: { queryKey: getListSoilAnalysesQueryKey() }});
  const createAnalysis = useCreateSoilAnalysis();
  
  const [formData, setFormData] = useState({
    ph: "", nitrogen: "", phosphorus: "", potassium: "", organicCarbon: "", location: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAnalysis.mutate({ 
      data: {
        location: formData.location,
        ph: formData.ph ? Number(formData.ph) : undefined,
        nitrogen: formData.nitrogen ? Number(formData.nitrogen) : undefined,
        phosphorus: formData.phosphorus ? Number(formData.phosphorus) : undefined,
        potassium: formData.potassium ? Number(formData.potassium) : undefined,
        organicCarbon: formData.organicCarbon ? Number(formData.organicCarbon) : undefined,
      }
    }, {
      onSuccess: () => {
        setFormData({ ph: "", nitrogen: "", phosphorus: "", potassium: "", organicCarbon: "", location: "" });
        queryClient.invalidateQueries({ queryKey: getListSoilAnalysesQueryKey() });
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Soil Intelligence</h1>
        <p className="text-muted-foreground mt-1">Input lab results for AI-driven fertilizer and crop recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 h-fit border-primary/20 shadow-sm bg-gradient-to-b from-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TestTube className="text-primary"/> New Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Farm Location/Block</Label>
                <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. North Field" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label>pH Level</Label>
                  <Input type="number" step="0.1" value={formData.ph} onChange={e => setFormData({...formData, ph: e.target.value})} placeholder="6.5" />
                </div>
                <div className="space-y-2">
                  <Label>Organic Carbon (%)</Label>
                  <Input type="number" step="0.01" value={formData.organicCarbon} onChange={e => setFormData({...formData, organicCarbon: e.target.value})} placeholder="0.5" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3 text-muted-foreground">Macronutrients (kg/ha)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Nitrogen (N)</Label>
                    <Input type="number" value={formData.nitrogen} onChange={e => setFormData({...formData, nitrogen: e.target.value})} placeholder="150" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Phosphorus (P)</Label>
                    <Input type="number" value={formData.phosphorus} onChange={e => setFormData({...formData, phosphorus: e.target.value})} placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Potassium (K)</Label>
                    <Input type="number" value={formData.potassium} onChange={e => setFormData({...formData, potassium: e.target.value})} placeholder="200" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base mt-2" disabled={createAnalysis.isPending}>
                {createAnalysis.isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating AI Report...</> : "Generate Recommendations"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-serif font-bold">Analysis History & Reports</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1,2].map(i => <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : history?.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
               <FlaskConical className="mx-auto h-12 w-12 opacity-20 mb-3" />
               <p className="font-medium text-lg">No soil data</p>
               <p className="text-sm mt-1">Enter your first soil test results to get AI insights.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {history?.map(record => (
                <Card key={record.id} className="overflow-hidden border-t-4 border-t-primary shadow-sm">
                  <div className="bg-muted/30 p-4 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{record.location || 'Unknown Field'}</h3>
                      <p className="text-xs text-muted-foreground">Tested on {formatDate(record.createdAt)}</p>
                    </div>
                    <div className="flex gap-4 text-sm font-medium bg-background px-4 py-2 rounded-lg border shadow-sm">
                       <span>pH: <span className={Number(record.ph) < 6 ? "text-red-500" : Number(record.ph) > 7.5 ? "text-blue-500" : "text-green-500"}>{record.ph || 'N/A'}</span></span>
                       <span className="text-muted-foreground/30">|</span>
                       <span>NPK: {record.nitrogen || '-'}:{record.phosphorus || '-'}:{record.potassium || '-'}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    {record.suitableCrops && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-sm text-primary mb-2 uppercase tracking-wide">
                          <Leaf size={16} /> Suitable Crops
                        </h4>
                        <p className="text-foreground leading-relaxed">{record.suitableCrops}</p>
                      </div>
                    )}
                    
                    {record.fertilizerSchedule && (
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                        <h4 className="flex items-center gap-2 font-bold text-sm text-primary mb-2 uppercase tracking-wide">
                          <Droplets size={16} /> Fertilizer Strategy
                        </h4>
                        <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">{record.fertilizerSchedule}</p>
                      </div>
                    )}

                    {record.aiRecommendation && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                          <TestTube size={16} /> Soil Health Notes
                        </h4>
                        <p className="text-muted-foreground text-sm italic border-l-2 pl-4 border-muted-foreground/30">{record.aiRecommendation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
