import { useListSchemes, getListSchemesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui/core";
import { Landmark, ExternalLink, CalendarDays, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function GovernmentSchemes() {
  const { data: schemes, isLoading } = useListSchemes({ query: { queryKey: getListSchemesQueryKey() }});
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Subsidy", "Insurance", "Loan", "Equipment", "General"];

  const filteredSchemes = filter === "All" 
    ? schemes 
    : schemes?.filter(s => s.category === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Govt Schemes</h1>
          <p className="text-muted-foreground mt-1">Discover subsidies and programs you are eligible for.</p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 hide-scrollbar">
        {categories.map(cat => (
          <Button 
            key={cat} 
            variant={filter === cat ? "default" : "outline"}
            className="rounded-full flex-shrink-0"
            onClick={() => setFilter(cat)}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes?.map(scheme => (
            <Card key={scheme.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-secondary/10 text-secondary-foreground rounded-xl flex items-center justify-center">
                    <Landmark size={24} className="text-secondary" />
                  </div>
                  {scheme.isActive ? (
                    <Badge className="bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Closed</Badge>
                  )}
                </div>
                
                <h3 className="font-serif text-xl font-bold mb-2">{scheme.name}</h3>
                <Badge variant="outline" className="w-fit mb-4">{scheme.category}</Badge>
                
                <p className="text-muted-foreground text-sm flex-1 mb-6">
                  {scheme.description}
                </p>

                <div className="space-y-3 text-sm border-t pt-4 mt-auto">
                  {scheme.benefit && (
                    <div className="flex gap-2">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span><strong>Benefit:</strong> {scheme.benefit}</span>
                    </div>
                  )}
                  {scheme.deadline && (
                    <div className="flex gap-2 text-destructive">
                      <CalendarDays size={16} className="shrink-0 mt-0.5" />
                      <span><strong>Deadline:</strong> {scheme.deadline}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <a href={scheme.applicationUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant={scheme.isActive ? "default" : "secondary"} className="w-full gap-2" disabled={!scheme.isActive}>
                      Apply Now <ExternalLink size={16} />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSchemes?.length === 0 && (
             <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl">
               <Landmark className="mx-auto h-12 w-12 opacity-20 mb-3" />
               <p className="font-medium text-lg">No schemes found</p>
               <p className="text-sm">Try changing the category filter.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
