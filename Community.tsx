import { useListCommunityPosts, getListCommunityPostsQueryKey, useCreateCommunityPost, useLikeCommunityPost } from "@workspace/api-client-react";
import { Card, CardContent, Button, Input, Textarea, Badge } from "@/components/ui/core";
import { MessageSquare, Heart, Share2, Send, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function Community() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useListCommunityPosts({ query: { queryKey: getListCommunityPostsQueryKey() }});
  const createPost = useCreateCommunityPost();
  const likePost = useLikeCommunityPost();
  
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    title: "", content: "", category: "Discussion", authorName: "Raju Farmer" // Mock auth
  });

  const categories = ["All", "Discussion", "Q&A", "Success Stories", "Expert Advice"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    
    createPost.mutate({ data: formData }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCommunityPostsQueryKey() });
        setFormData({ ...formData, title: "", content: "" });
      }
    });
  };

  const handleLike = (id: number) => {
    likePost.mutate({ id }, {
      onSuccess: () => {
        // Optimistic update would be better here, but invalidate works
        queryClient.invalidateQueries({ queryKey: getListCommunityPostsQueryKey() });
      }
    });
  };

  const filteredPosts = filter === "All" ? posts : posts?.filter(p => p.category === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Farmer Community</h1>
        <p className="text-muted-foreground mt-1">Connect, ask questions, and share experiences.</p>
      </div>

      <Card className="border-primary/20 shadow-sm overflow-hidden">
        <div className="bg-primary/5 p-4 border-b">
          <p className="font-serif font-bold text-primary">Start a conversation</p>
        </div>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input required placeholder="Post Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-transparent border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 text-lg font-serif" />
            <Textarea required placeholder="What do you want to ask or share?" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="bg-transparent border-0 resize-none px-0 focus-visible:ring-0 min-h-[100px]" />
            
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex gap-2">
                <select className="h-8 rounded-full border border-input bg-muted/30 px-3 text-xs focus-visible:outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Discussion</option>
                  <option>Q&A</option>
                  <option>Success Stories</option>
                </select>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><ImageIcon size={16}/></Button>
              </div>
              <Button type="submit" size="sm" className="gap-2 rounded-full px-6" disabled={createPost.isPending}>
                {createPost.isPending ? "Posting..." : <><Send size={14}/> Post</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 hide-scrollbar">
        {categories.map(cat => (
          <Button key={cat} variant={filter === cat ? "default" : "outline"} className="rounded-full flex-shrink-0" onClick={() => setFilter(cat)} size="sm">
            {cat}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {isLoading ? (
          [1,2].map(i => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />)
        ) : filteredPosts?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
             <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-3" />
             <p className="font-medium text-lg">No posts here yet.</p>
          </div>
        ) : (
          filteredPosts?.map(post => (
            <Card key={post.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-0">
                <div className="p-5 border-b">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-serif">
                        {post.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-sm">{post.authorName}</p>
                          {post.authorRole === 'Expert' && <ShieldCheck size={14} className="text-blue-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)} in {post.category}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                  
                  {post.tags && (
                    <div className="flex gap-2 mt-4">
                      {post.tags.split(',').map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted/50 text-xs font-normal">#{tag.trim()}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center p-2 bg-muted/10">
                  <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary gap-2" onClick={() => handleLike(post.id)}>
                    <Heart size={18} className={post.likes > 0 ? "fill-primary/20 text-primary" : ""} /> 
                    <span className={post.likes > 0 ? "text-primary font-medium" : ""}>{post.likes > 0 ? post.likes : 'Like'}</span>
                  </Button>
                  <div className="w-px h-6 bg-border mx-1"></div>
                  <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground gap-2">
                    <MessageSquare size={18} /> Comment
                  </Button>
                  <div className="w-px h-6 bg-border mx-1"></div>
                  <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground gap-2">
                    <Share2 size={18} /> Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
