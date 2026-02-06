import { createClient } from '@/lib/supabaseServer'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react'
import { AddTaskButton } from './add-task-button'

export default async function CompliancePage() {
    const supabase = await createClient()
    const { data: tasks } = await supabase.from('compliance_tasks').select('*')

    const pendingTasks = tasks?.filter(t => t.status === 'pending').length || 0
    const highPriority = tasks?.filter(t => t.priority === 'high' && t.status === 'pending').length || 0
    const completed = tasks?.filter(t => t.status === 'completed').length || 0

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Compliance</h2>
                    <p className="text-muted-foreground">Track regulatory deadlines and filings.</p>
                </div>
                <AddTaskButton />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <KpiCard
                    title="Pending Filings"
                    value={pendingTasks.toString()}
                    icon={AlertCircle}
                />
                <KpiCard
                    title="High Priority"
                    value={highPriority.toString()}
                    trend="down" // down is bad here usually, but context matters
                    icon={ShieldCheck}
                />
                <KpiCard
                    title="Completed"
                    value={completed.toString()}
                    icon={CheckCircle}
                />
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Task</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task) => (
                            <tr key={task.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{task.title}</td>
                                <td className="px-6 py-4">{new Date(task.due_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 capitalize">{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
