import { useListNotifications, getListNotificationsQueryKey, useMarkNotificationRead, useMarkAllNotificationsRead } from "@workspace/api-client-react";
import { Card, Button } from "@/components/ui/core";
import { Bell, Droplets, ShieldAlert, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function Notifications() {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useListNotifications({ query: { queryKey: getListNotificationsQueryKey() }});
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const handleMarkAllRead = () => {
    markAllRead.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });
      }
    });
  };

  const handleMarkRead = (id: number) => {
    markRead.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });
      }
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <ShieldAlert className="text-destructive" size={20} />;
      case 'Reminder': return <Droplets className="text-blue-500" size={20} />;
      case 'Market': return <TrendingUp className="text-primary" size={20} />;
      default: return <Bell className="text-muted-foreground" size={20} />;
    }
  };

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0 max-w-3xl mx-auto">
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">You have {unreadCount} unread messages.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead} disabled={markAllRead.isPending}>
            <CheckCircle size={16} className="mr-2" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          [1,2,3,4].map(i => <div key={i} className="h-20 bg-muted rounded-xl animate-pulse" />)
        ) : notifications?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
             <Bell className="mx-auto h-12 w-12 opacity-20 mb-3" />
             <p className="font-medium text-lg">All caught up!</p>
             <p className="text-sm">No new notifications at this time.</p>
          </div>
        ) : (
          notifications?.map(notif => (
            <Card key={notif.id} className={`overflow-hidden transition-colors ${!notif.isRead ? 'bg-primary/5 border-primary/20' : 'bg-transparent shadow-none border-dashed'}`}>
              <div className="p-4 flex gap-4">
                <div className="mt-1 shrink-0 bg-background rounded-full p-2 shadow-sm border">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold ${!notif.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notif.title}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12}/> {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className={`text-sm mt-1 ${!notif.isRead ? 'text-foreground/90' : 'text-muted-foreground'}`}>{notif.message}</p>
                  
                  {!notif.isRead && (
                    <div className="mt-3 flex justify-end">
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleMarkRead(notif.id)}>
                        Mark as read
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
