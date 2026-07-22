import { Link, useLocation } from "wouter";
import { 
  Home, Sprout, ShieldAlert, TrendingUp, Droplets, BookOpen, 
  Landmark, MapPin, Users, IndianRupee, TestTube, Bot, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Crops", href: "/crops", icon: Sprout },
  { name: "Disease AI", href: "/disease", icon: ShieldAlert },
  { name: "Market Prices", href: "/market", icon: TrendingUp },
  { name: "Irrigation", href: "/irrigation", icon: Droplets },
  { name: "Farm Diary", href: "/diary", icon: BookOpen },
  { name: "Schemes", href: "/schemes", icon: Landmark },
  { name: "Land Market", href: "/land", icon: MapPin },
  { name: "Community", href: "/community", icon: Users },
  { name: "Expenses", href: "/expenses", icon: IndianRupee },
  { name: "Soil Intelligence", href: "/soil", icon: TestTube },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Sprout size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-primary">AgriSmart</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-primary" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden flex items-center gap-2">
            <Sprout className="text-primary" size={24} />
            <span className="font-serif text-xl font-bold text-primary">AgriSmart</span>
          </div>
          <div className="hidden md:block"></div>
          
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="relative p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold font-serif shadow-sm">
              R
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#fdfbf7]">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav (Simplified) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-card flex justify-around p-2 z-50 pb-safe">
        {navigation.slice(0, 4).map((item) => (
          <Link key={item.name} href={item.href} className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium",
            location === item.href ? "text-primary" : "text-muted-foreground"
          )}>
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
        <Link href="/ai-assistant" className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium",
            location === "/ai-assistant" ? "text-primary" : "text-muted-foreground"
          )}>
            <Bot size={20} />
            AI
        </Link>
      </div>
    </div>
  );
}
