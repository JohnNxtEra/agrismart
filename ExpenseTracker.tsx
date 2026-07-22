import { useListExpenses, getListExpensesQueryKey, useCreateExpense, useGetExpenseSummary, getGetExpenseSummaryQueryKey, useDeleteExpense } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Badge } from "@/components/ui/core";
import { IndianRupee, Plus, Trash2, PieChart as PieChartIcon } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function ExpenseTracker() {
  const queryClient = useQueryClient();
  const { data: expenses, isLoading: listLoading } = useListExpenses({ query: { queryKey: getListExpensesQueryKey() }});
  const { data: summary, isLoading: summaryLoading } = useGetExpenseSummary({ query: { queryKey: getGetExpenseSummaryQueryKey() }});
  
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    category: "Seeds", description: "", amount: "", date: new Date().toISOString().split('T')[0]
  });

  const categories = ["Seeds", "Fertilizer", "Pesticide", "Labor", "Equipment", "Transport", "Other"];
  const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#8b5cf6', '#64748b'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense.mutate({ 
      data: { ...formData, amount: Number(formData.amount) }
    }, {
      onSuccess: () => {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: getListExpensesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetExpenseSummaryQueryKey() });
        setFormData({ ...formData, description: "", amount: "" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if(confirm("Delete expense?")) {
      deleteExpense.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListExpensesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetExpenseSummaryQueryKey() });
        }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-1">Track your farm input costs and labor.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          {isAdding ? "Cancel" : <><Plus size={18} /> Add Expense</>}
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-card shadow-md">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="e.g. Urea bags for Paddy" />
              </div>
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input required type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="md:col-span-3 flex items-end justify-end">
                <Button type="submit" disabled={createExpense.isPending}>
                  {createExpense.isPending ? "Saving..." : "Save Expense"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-primary text-primary-foreground border-transparent">
            <CardContent className="p-6">
              <p className="text-primary-foreground/80 text-sm font-medium mb-1">Total Expenses</p>
              <h2 className="text-4xl font-serif font-bold tracking-tight">
                {summaryLoading ? "..." : formatCurrency(summary?.totalAmount || 0)}
              </h2>
              <p className="text-primary-foreground/60 text-xs mt-4">Current Season</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2"><PieChartIcon size={18}/> Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="px-2">
              {summaryLoading ? (
                <div className="h-[200px] flex items-center justify-center animate-pulse bg-muted/20 m-4 rounded-full"></div>
              ) : summary?.byCategory && summary.byCategory.length > 0 ? (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summary.byCategory}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={80}
                        paddingAngle={2}
                        dataKey="total"
                        nameKey="category"
                      >
                        {summary.byCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No data to display</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4 border-b">
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              {listLoading ? (
                <div className="p-6 text-center animate-pulse">Loading...</div>
              ) : expenses?.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <IndianRupee className="mx-auto h-10 w-10 opacity-20 mb-2" />
                  <p>No expenses recorded.</p>
                </div>
              ) : (
                <ul className="divide-y">
                  {expenses?.map(expense => (
                    <li key={expense.id} className="flex items-center justify-between p-4 hover:bg-muted/30 group transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary-foreground font-bold">
                          {expense.category.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{expense.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <Badge variant="outline" className="text-[10px] py-0">{expense.category}</Badge>
                            <span>{formatDate(expense.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-serif font-bold text-lg text-destructive">{formatCurrency(expense.amount)}</span>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 -mr-2" onClick={() => handleDelete(expense.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
