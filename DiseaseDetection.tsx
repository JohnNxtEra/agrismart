import { useListDiseaseDetections, getListDiseaseDetectionsQueryKey, useCreateDiseaseDetection } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge } from "@/components/ui/core";
import { UploadCloud, AlertTriangle, ShieldCheck, Leaf, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function DiseaseDetection() {
  const queryClient = useQueryClient();
  const { data: history, isLoading: historyLoading } = useListDiseaseDetections({ query: { queryKey: getListDiseaseDetectionsQueryKey() }});
  const createDetection = useCreateDiseaseDetection();
  
  const [cropName, setCropName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        // Extract base64 without prefix
        const base64 = (reader.result as string).split(',')[1];
        setImageBase64(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!imageBase64 || !cropName) return;
    
    createDetection.mutate({
      data: {
        cropName,
        imageBase64,
      }
    }, {
      onSuccess: () => {
        setPreviewUrl(null);
        setImageBase64(null);
        setCropName("");
        queryClient.invalidateQueries({ queryKey: getListDiseaseDetectionsQueryKey() });
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">AI Disease Detection</h1>
          <p className="text-muted-foreground mt-1">Upload a photo of a sick plant for instant diagnosis & treatment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scanner Panel */}
        <Card className="lg:col-span-5 bg-gradient-to-br from-card to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UploadCloud size={20} className="text-primary" /> New Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Crop Name</Label>
              <Input placeholder="e.g. Tomato, Chilli" value={cropName} onChange={e => setCropName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Leaf Photo</Label>
              <div 
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${previewUrl ? 'border-primary bg-primary/5' : 'hover:bg-muted/50 border-input'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img src={previewUrl} alt="Preview" className="mx-auto max-h-48 rounded-lg object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-sm font-medium">Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium">Click to upload photo</p>
                    <p className="text-xs text-muted-foreground mt-1">Clear, close-up shot of the affected leaf</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
              </div>
            </div>

            <Button 
              className="w-full h-12 text-base shadow-lg" 
              onClick={handleAnalyze}
              disabled={!cropName || !imageBase64 || createDetection.isPending}
            >
              {createDetection.isPending ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing with AI...</>
              ) : "Analyze Now"}
            </Button>
          </CardContent>
        </Card>

        {/* Results / History */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-serif font-bold">Recent Diagnoses</h2>
          
          {historyLoading ? (
            <div className="space-y-4">
              {[1,2].map(i => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : history?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
               <ShieldCheck className="mx-auto h-12 w-12 opacity-20 mb-3" />
               <p>No diagnoses yet. Upload an image to begin.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history?.map(detection => (
                <Card key={detection.id} className="overflow-hidden border-l-4 border-l-primary/50">
                  <div className="p-6">
                    <div className="flex gap-6">
                      {detection.imageUrl && (
                         <img src={detection.imageUrl} alt="crop" className="w-24 h-24 object-cover rounded-xl shadow-sm hidden sm:block" />
                      )}
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-serif text-lg font-bold">{detection.diseaseName || 'Analysis Error'}</h3>
                              <Badge variant={detection.severity === 'High' ? 'destructive' : detection.severity === 'Low' ? 'outline' : 'secondary'}>
                                {detection.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{detection.cropName} • Analyzed on {formatDate(detection.createdAt)}</p>
                          </div>
                          {detection.confidence && (
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                              {detection.confidence}% Match
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                            <h4 className="text-xs font-bold uppercase text-green-700 dark:text-green-500 mb-1 flex items-center gap-1"><Leaf size={12}/> Organic Treatment</h4>
                            <p className="text-sm text-green-900 dark:text-green-300/80">{detection.organicTreatment || 'N/A'}</p>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                            <h4 className="text-xs font-bold uppercase text-red-700 dark:text-red-500 mb-1 flex items-center gap-1"><AlertTriangle size={12}/> Chemical Treatment</h4>
                            <p className="text-sm text-red-900 dark:text-red-300/80">{detection.chemicalTreatment || 'N/A'}</p>
                          </div>
                        </div>
                        
                        {detection.aiResponseTelugu && (
                          <div className="mt-4 p-3 bg-muted/30 rounded-lg border">
                            <p className="text-xs font-bold uppercase text-muted-foreground mb-1">తెలుగు సూచనలు (Telugu)</p>
                            <p className="text-sm leading-relaxed">{detection.aiResponseTelugu}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
