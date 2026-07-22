import { useListGeminiConversations, getListGeminiConversationsQueryKey, useCreateGeminiConversation } from "@workspace/api-client-react";
import { Card, Button, Input } from "@/components/ui/core";
import { Bot, Send, User, Loader2, Plus, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

interface Message {
  id?: number;
  role: string;
  content: string;
}

export default function AiAssistant() {
  const queryClient = useQueryClient();
  const { data: conversations, isLoading: convLoading } = useListGeminiConversations({ query: { queryKey: getListGeminiConversationsQueryKey() }});
  const createConversation = useCreateGeminiConversation();
  
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-select first conversation or fetch messages when activeConvId changes
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  useEffect(() => {
    if (activeConvId) {
      // Fetch initial messages manually since we don't have a generated hook that returns messages easily without wrapping, wait, we do have useListGeminiMessages
      fetch(`/api/gemini/conversations/${activeConvId}/messages`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error(err));
    } else {
      setMessages([]);
    }
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleNewChat = () => {
    createConversation.mutate({ data: { title: "New Farm Chat" } }, {
      onSuccess: (newConv) => {
        queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() });
        setActiveConvId(newConv.id);
      }
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConvId || isStreaming) return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch(`/api/gemini/conversations/${activeConvId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userMessage.content })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let aiResponseContent = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
        
        for (const line of lines) {
          const dataStr = line.replace('data: ', '');
          if (dataStr === '[DONE]') continue;
          
          try {
            const data = JSON.parse(dataStr);
            if (data.content) {
              aiResponseContent += data.content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = aiResponseContent;
                return newMessages;
              });
            }
          } catch (e) {
             // Ignore parse errors for partial chunks
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsStreaming(false);
      queryClient.invalidateQueries({ queryKey: getListGeminiConversationsQueryKey() }); // Refresh titles if updated
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[500px] animate-in fade-in duration-500 flex flex-col md:flex-row gap-6 pb-safe">
      {/* Sidebar - Conversations list */}
      <div className="w-full md:w-64 flex flex-col gap-4 h-[200px] md:h-full shrink-0">
        <Button onClick={handleNewChat} className="w-full gap-2 justify-start" variant="outline" disabled={createConversation.isPending}>
          <Plus size={16} /> New Chat
        </Button>
        
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 hide-scrollbar">
          {convLoading ? (
             <div className="animate-pulse space-y-2">
               {[1,2,3].map(i => <div key={i} className="h-12 bg-muted rounded-lg" />)}
             </div>
          ) : (
            conversations?.map(conv => (
              <button 
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex items-start gap-3 ${activeConvId === conv.id ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-muted bg-card border'}`}
              >
                <MessageSquare size={16} className={`mt-0.5 shrink-0 ${activeConvId === conv.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{conv.title}</p>
                  <p className={`text-[10px] ${activeConvId === conv.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{formatDate(conv.createdAt)}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-card/50">
        {!activeConvId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <Bot className="h-16 w-16 mb-4 opacity-20" />
            <p className="font-medium text-lg">AI Agronomist</p>
            <p className="text-sm">Select or create a chat to begin.</p>
          </div>
        ) : (
          <>
            <div className="bg-primary/5 p-4 border-b flex items-center gap-3">
              <div className="bg-primary/20 text-primary p-2 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="font-serif font-bold">Expert Agronomist</h2>
                <p className="text-xs text-muted-foreground">Bilingual (English/Telugu) support</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 text-muted-foreground">
                  <div className="bg-muted p-4 rounded-full"><Bot size={32} /></div>
                  <p className="font-medium">Namaskaram! How can I help with your farm today?</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("What is the ideal NPK ratio for Cotton in red soil?")}>Fertilizer advice</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("Why are my chilli leaves curling upwards?")}>Pest control</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setInput("పత్తి పంటలో గులాబీ రంగు పురుగు నివారణ ఎలా?")}>Ask in Telugu</Badge>
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-secondary/10 text-foreground rounded-tr-sm' : 'bg-card border shadow-sm rounded-tl-sm'}`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content || (isStreaming && i === messages.length - 1 ? "Thinking..." : "")}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t">
              <form onSubmit={handleSend} className="relative flex items-center">
                <Input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  placeholder="Ask anything about your crops..." 
                  className="pr-12 py-6 rounded-full bg-card shadow-sm"
                  disabled={isStreaming}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-2 h-8 w-8 rounded-full" 
                  disabled={!input.trim() || isStreaming}
                >
                  {isStreaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
