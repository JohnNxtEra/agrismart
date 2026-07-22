import { useListMarketPrices, getListMarketPricesQueryKey, useGetMarketSummary, getGetMarketSummaryQueryKey, useCreateMarketPrice } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge } from "@/components/ui/core";
import { TrendingUp, TrendingDown, IndianRupee, MapPin } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MarketPrices() {
  const queryClient = useQueryClient();
  const { data: prices, isLoading: pricesLoading } = useListMarketPrices({ query: { queryKey: getListMarketPricesQueryKey() }});
  const { data: summary, isLoading: summaryLoading } = useGetMarketSummary({ query: { queryKey: getGetMarketSummaryQueryKey() }});
  const createPrice = useCreateMarketPrice();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    cropName: "",
    marketPrice: "",
    mspPrice: "",
    unit: "Quintal",
    market: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPrice.mutate({ 
      data: {
        ...formData,
        marketPrice: Number(formData.marketPrice),
        mspPrice: formData.mspPrice ? Number(formData.mspPrice) : undefined
      }
    }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListMarketPricesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetMarketSummaryQueryKey() });
        setFormData({ ...formData, cropName: "", marketPrice: "", mspPrice: "" });
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Market Prices</h1>
          <p className="text-muted-foreground mt-1">Track mandi prices and compare with MSP.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "outline" : "default"}>
          {isAdding ? "Cancel" : "Add Price Entry"}
        </Button>
      </div>

      {isAdding && (
         <Card className="bg-card border-primary/20 shadow-md">
         <CardContent className="pt-6">
           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label>Crop Name</Label>
               <Input required value={formData.cropName} onChange={e => setFormData({...formData, cropName: e.target.value})} placeholder="e.g. Cotton" />
             </div>
             <div className="space-y-2">
               <Label>Market</Label>
               <Input required value={formData.market} onChange={e => setFormData({...formData, market: e.target.value})} placeholder="e.g. Guntur Mandi" />
             </div>
             <div className="space-y-2">
               <Label>Market Price (₹)</Label>
               <Input required type="number" value={formData.marketPrice} onChange={e => setFormData({...formData, marketPrice: e.target.value})} />
             </div>
             <div className="space-y-2">
               <Label>MSP Price (₹) (Optional)</Label>
               <Input type="number" value={formData.mspPrice} onChange={e => setFormData({...formData, mspPrice: e.target.value})} />
             </div>
             <div className="space-y-2">
               <Label>Unit</Label>
               <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
                 <option>Quintal</option>
                 <option>Tonne</option>
                 <option>Kg</option>
               </select>
             </div>
             <div className="space-y-2 flex items-end">
               <Button type="submit" className="w-full" disabled={createPrice.isPending}>
                 {createPrice.isPending ? "Saving..." : "Save Entry"}
               </Button>
             </div>
           </form>
         </CardContent>
       </Card>
      )}

      {/* Summary Section */}
      {!summaryLoading && summary && summary.trending?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.trending.slice(0, 3).map(trend => (
            <Card key={`trend-${trend.id}`} className="bg-primary/5 border-primary/10">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold">{trend.cropName}</p>
                  <p className="text-xs text-muted-foreground">{trend.market}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatCurrency(trend.marketPrice)}</p>
                  <Badge variant="outline" className="bg-white text-primary mt-1 border-primary/20">
                    <TrendingUp size={12} className="mr-1"/> Trending Up
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Crop & Market</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Market Price</th>
                <th className="px-6 py-4 font-medium text-right">MSP</th>
                <th className="px-6 py-4 font-medium text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pricesLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading prices...</td></tr>
              ) : prices?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No price data available.</td></tr>
              ) : (
                prices?.map(price => (
                  <tr key={price.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground">{price.cropName}</div>
                      <div className="text-xs flex items-center text-muted-foreground mt-0.5">
                        <MapPin size={10} className="mr-1" /> {price.market}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {formatDate(price.date)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-bold">{formatCurrency(price.marketPrice)}</div>
                      <div className="text-xs text-muted-foreground">per {price.unit}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {price.mspPrice ? (
                        <div className="font-medium text-muted-foreground">{formatCurrency(price.mspPrice)}</div>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {price.trend === 'up' ? (
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5"><TrendingUp size={14} className="mr-1"/> Up</Badge>
                      ) : price.trend === 'down' ? (
                        <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5"><TrendingDown size={14} className="mr-1"/> Down</Badge>
                      ) : (
                         <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
