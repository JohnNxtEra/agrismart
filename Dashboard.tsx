import { useGetDashboard, getGetDashboardQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui/core";
import { Sprout, Droplets, AlertTriangle, TrendingUp, CloudSun } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetDashboard({ query: { queryKey: getGetDashboardQueryKey() }});

  if (isLoading) {
    return <div className="animate-pulse space-y-6">
      <div className="h-8 bg-muted rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded-xl"></div>)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
      <header>
        <h1 className="text-3xl font-serif font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1 text-lg">Good morning. Here is what's happening on your farm.</p>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Crops</p>
                <p className="text-3xl font-serif font-bold text-primary mt-1">{dashboard?.totalCrops || 0}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <Sprout size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Irrigations</p>
                <p className="text-3xl font-serif font-bold mt-1">{dashboard?.activeIrrigations || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                <Droplets size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Expenses</p>
                <p className="text-3xl font-serif font-bold mt-1">{formatCurrency(dashboard?.monthlyExpenseTotal || 0)}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary-foreground">
                <TrendingUp size={24} className="text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={dashboard?.pendingNotifications ? "bg-red-50" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Alerts</p>
                <p className="text-3xl font-serif font-bold text-destructive mt-1">{dashboard?.pendingNotifications || 0}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center text-destructive">
                <AlertTriangle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="col-span-1 lg:col-span-2 space-y-8">
          
          {/* Upcoming Irrigation Schedules */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Upcoming Irrigation</CardTitle>
              <Link href="/irrigation" className="text-sm text-primary font-medium hover:underline">View All</Link>
            </CardHeader>
            <CardContent>
              {dashboard?.upcomingSchedules && dashboard.upcomingSchedules.length > 0 ? (
                <div className="space-y-4">
                  {dashboard.upcomingSchedules.map(schedule => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500/10 p-3 rounded-lg text-blue-500">
                          <Droplets size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{schedule.cropName}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(schedule.scheduledAt)} • {schedule.durationMinutes} mins</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white">{schedule.method}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CloudSun className="mx-auto h-12 w-12 opacity-20 mb-3" />
                  <p>No upcoming irrigation schedules.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Disease Detections */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Detections</CardTitle>
              <Link href="/disease" className="text-sm text-primary font-medium hover:underline">Detect New</Link>
            </CardHeader>
            <CardContent>
              {dashboard?.recentDetections && dashboard.recentDetections.length > 0 ? (
                <div className="space-y-4">
                  {dashboard.recentDetections.map(detection => (
                    <div key={detection.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      {detection.imageUrl ? (
                         <img src={detection.imageUrl} alt="crop" className="w-16 h-16 object-cover rounded-md" />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <Sprout className="text-muted-foreground opacity-50" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-bold">{detection.cropName}</p>
                          <Badge variant={detection.severity === 'High' ? 'destructive' : 'secondary'}>
                            {detection.severity || 'Unknown'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{detection.diseaseName || 'Healthy'}</p>
                        <p className="text-xs text-muted-foreground mt-2">{formatDate(detection.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Sprout className="mx-auto h-12 w-12 opacity-20 mb-3" />
                  <p>No recent disease detections.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Top Market Prices */}
          <Card>
            <CardHeader>
              <CardTitle>Top Market Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard?.topMarketPrices?.map((price) => (
                  <div key={price.id} className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{price.cropName}</p>
                      <p className="text-xs text-muted-foreground">{price.market}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{formatCurrency(price.marketPrice)}<span className="text-xs font-normal text-muted-foreground">/{price.unit}</span></p>
                      {price.trend === 'up' && <span className="text-xs text-primary flex items-center justify-end"><TrendingUp size={12} className="mr-1"/> Up</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
