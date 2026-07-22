import { useListIrrigationSchedules, getListIrrigationSchedulesQueryKey, useCreateIrrigationSchedule, useDeleteIrrigationSchedule, useUpdateIrrigationSchedule } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge } from "@/components/ui/core";
import { Droplets, Clock, Plus, Trash2, Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils";

export default function SmartIrrigation() {
  const queryClient = useQueryClient();
  const { data: schedules, isLoading } = useListIrrigationSchedules({ query: { queryKey: getListIrrigationSchedulesQueryKey() }});
  const createSchedule = useCreateIrrigationSchedule();
  const updateSchedule = useUpdateIrrigationSchedule();
  const deleteSchedule = useDeleteIrrigationSchedule();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    cropName: "",
    scheduledAt: "",
    durationMinutes: "",
    method: "Drip",
    status: "Scheduled"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSchedule.mutate({ 
      data: {
        ...formData,
        durationMinutes: Number(formData.durationMinutes),
        scheduledAt: new Date(formData.scheduledAt).toISOString()
      }
    }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListIrrigationSchedulesQueryKey() });
        setFormData({ cropName: "", scheduledAt: "", durationMinutes: "", method: "Drip", status: "Scheduled" });
      }
    });
  };

  const handleStatusToggle = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'Scheduled' : 'Completed';
    updateSchedule.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListIrrigationSchedulesQueryKey() })
    });
  };

  const handleDelete = (id: number) => {
    if(confirm("Delete this schedule?")) {
      deleteSchedule.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListIrrigationSchedulesQueryKey() })
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Smart Irrigation</h1>
          <p className="text-muted-foreground mt-1">Manage and track your watering schedules.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          {isAdding ? "Cancel" : <><Plus size={18} /> New Schedule</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Crop Name</Label>
                <Input required value={formData.cropName} onChange={e => setFormData({...formData, cropName: e.target.value})} placeholder="e.g. Paddy Block A" />
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input required type="datetime-local" value={formData.scheduledAt} onChange={e => setFormData({...formData, scheduledAt: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Duration (Minutes)</Label>
                <Input required type="number" value={formData.durationMinutes} onChange={e => setFormData({...formData, durationMinutes: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Method</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.method} onChange={e => setFormData({...formData, method: e.target.value})}>
                  <option>Drip</option>
                  <option>Sprinkler</option>
                  <option>Flood</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="space-y-2 flex items-end">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={createSchedule.isPending}>
                  {createSchedule.isPending ? "Saving..." : "Save Schedule"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {schedules?.map(schedule => {
            const isCompleted = schedule.status === 'Completed';
            const dateStr = new Date(schedule.scheduledAt).toLocaleString('en-IN', {
              weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
            });

            return (
              <Card key={schedule.id} className={`transition-all duration-300 ${isCompleted ? 'opacity-60 bg-muted/30' : 'hover:border-blue-300'}`}>
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 cursor-pointer transition-colors ${isCompleted ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 hover:bg-blue-200'}`} onClick={() => handleStatusToggle(schedule.id, schedule.status)}>
                      {isCompleted ? <CheckCircle2 size={24} /> : <Droplets size={24} />}
                    </div>
                    <div>
                      <h3 className={`font-serif text-xl font-bold ${isCompleted ? 'line-through decoration-2 decoration-muted-foreground/30' : ''}`}>{schedule.cropName}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14}/> {dateStr}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {schedule.durationMinutes} mins</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <Badge variant={isCompleted ? "outline" : "default"} className={!isCompleted ? "bg-blue-500 hover:bg-blue-600" : ""}>
                      {schedule.method}
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(schedule.id)}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {schedules?.length === 0 && !isAdding && (
            <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-xl">
              <Droplets className="mx-auto h-12 w-12 opacity-20 mb-3 text-blue-500" />
              <p className="font-medium text-lg">No irrigation schedules</p>
              <p className="text-sm mt-1">Create a schedule to get reminders.</p>
              <Button variant="outline" className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => setIsAdding(true)}>Add Schedule</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
