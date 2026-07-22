import { useListLandListings, getListLandListingsQueryKey, useCreateLandListing } from "@workspace/api-client-react";
import { Card, CardContent, Button, Input, Label, Badge, Textarea } from "@/components/ui/core";
import { MapPin, IndianRupee, Phone, CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function LandMarketplace() {
  const queryClient = useQueryClient();
  const { data: listings, isLoading } = useListLandListings({ query: { queryKey: getListLandListingsQueryKey() }});
  const createListing = useCreateLandListing();
  
  const [filter, setFilter] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", description: "", listingType: "Sell", 
    area: "", areaUnit: "Acres", price: "", priceUnit: "Total", 
    district: "", state: "", ownerName: "", ownerPhone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createListing.mutate({ 
      data: {
        ...formData,
        area: Number(formData.area),
        price: Number(formData.price),
      }
    }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListLandListingsQueryKey() });
      }
    });
  };

  const filteredListings = filter === "All" ? listings : listings?.filter(l => l.listingType === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Land Marketplace</h1>
          <p className="text-muted-foreground mt-1">Buy, sell, or lease agricultural land.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2 shrink-0">
          {isAdding ? "Cancel" : <><Plus size={18} /> Post Listing</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-card shadow-md border-primary/20">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Listing Title</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. 5 Acres fertile land" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.listingType} onChange={e => setFormData({...formData, listingType: e.target.value})}>
                    <option>Sell</option>
                    <option>Buy</option>
                    <option>Lease</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Area</Label>
                  <div className="flex gap-2">
                    <Input required type="number" step="0.1" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
                    <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.areaUnit} onChange={e => setFormData({...formData, areaUnit: e.target.value})}>
                      <option>Acres</option><option>Hectares</option><option>Guntas</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <div className="flex gap-2">
                    <Input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.priceUnit} onChange={e => setFormData({...formData, priceUnit: e.target.value})}>
                      <option>Total</option><option>Per Acre</option><option>Per Year</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Input required value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input required value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input required type="tel" value={formData.ownerPhone} onChange={e => setFormData({...formData, ownerPhone: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Mention water source, soil type, road access..." />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={createListing.isPending}>
                  {createListing.isPending ? "Posting..." : "Post Listing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 mb-6">
        {["All", "Sell", "Buy", "Lease"].map(type => (
          <Button key={type} variant={filter === type ? "default" : "outline"} size="sm" onClick={() => setFilter(type)} className="rounded-full">
            {type}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings?.map(listing => (
            <Card key={listing.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="h-32 bg-muted/50 flex items-center justify-center relative">
                {listing.imageUrl ? (
                  <img src={listing.imageUrl} alt="land" className="w-full h-full object-cover" />
                ) : (
                  <MapPin className="h-10 w-10 text-muted-foreground/30" />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {listing.isVerified && <Badge className="bg-primary border-transparent"><CheckCircle size={12} className="mr-1"/> Verified</Badge>}
                  <Badge variant="secondary">{listing.listingType}</Badge>
                </div>
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-bold mb-1 line-clamp-1">{listing.title}</h3>
                <p className="text-xl font-bold text-primary mb-3">
                  {formatCurrency(listing.price)} <span className="text-xs text-muted-foreground font-normal">({listing.priceUnit})</span>
                </p>
                
                <div className="space-y-2 text-sm mb-4 flex-1">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{listing.area} {listing.areaUnit}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-right">{listing.district}, {listing.state}</span>
                  </div>
                  <p className="text-muted-foreground text-xs line-clamp-2 pt-1">{listing.description}</p>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <Button className="w-full gap-2" variant="outline">
                    <Phone size={16} /> Contact
                  </Button>
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-3">Posted on {formatDate(listing.createdAt)} by {listing.ownerName}</p>
              </CardContent>
            </Card>
          ))}
          
          {filteredListings?.length === 0 && (
             <div className="col-span-full py-16 text-center text-muted-foreground border-2 border-dashed rounded-xl">
               <MapPin className="mx-auto h-12 w-12 opacity-20 mb-3" />
               <p className="font-medium text-lg">No listings found</p>
               <p className="text-sm">Be the first to post a land listing.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
