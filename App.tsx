import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CropRegistry from "@/pages/CropRegistry";
import MarketPrices from "@/pages/MarketPrices";
import DiseaseDetection from "@/pages/DiseaseDetection";
import SmartIrrigation from "@/pages/SmartIrrigation";
import FarmDiary from "@/pages/FarmDiary";
import GovernmentSchemes from "@/pages/GovernmentSchemes";
import LandMarketplace from "@/pages/LandMarketplace";
import Community from "@/pages/Community";
import ExpenseTracker from "@/pages/ExpenseTracker";
import SoilIntelligence from "@/pages/SoilIntelligence";
import AiAssistant from "@/pages/AiAssistant";
import Notifications from "@/pages/Notifications";

const NotFound = () => (
  <div className="text-center py-20 flex flex-col items-center justify-center h-full">
    <h1 className="text-6xl font-bold text-primary opacity-20 mb-4">404</h1>
    <h2 className="text-2xl font-bold">Page Not Found</h2>
    <p className="text-muted-foreground mt-2">The field you're looking for doesn't exist.</p>
  </div>
);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <AppLayout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/crops" component={CropRegistry} />
            <Route path="/disease" component={DiseaseDetection} />
            <Route path="/market" component={MarketPrices} />
            <Route path="/irrigation" component={SmartIrrigation} />
            <Route path="/diary" component={FarmDiary} />
            <Route path="/schemes" component={GovernmentSchemes} />
            <Route path="/land" component={LandMarketplace} />
            <Route path="/community" component={Community} />
            <Route path="/expenses" component={ExpenseTracker} />
            <Route path="/soil" component={SoilIntelligence} />
            <Route path="/ai-assistant" component={AiAssistant} />
            <Route path="/notifications" component={Notifications} />
            <Route component={NotFound} />
          </Switch>
        </AppLayout>
      </WouterRouter>
    </QueryClientProvider>
  );
}
