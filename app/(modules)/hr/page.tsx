import { createClient } from '@/lib/supabaseServer'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { Users, Clock } from 'lucide-react'
import { AddEmployeeButton } from './add-employee-button'

export default async function HrPage() {
    const supabase = await createClient()
    const { data: employees } = await supabase.from('hr_employees').select('*')

    const totalEmployees = employees?.length || 0
    const totalPayroll = employees?.reduce((acc, emp) => acc + (emp.salary || 0), 0) || 0

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Human Resources</h2>
                    <p className="text-muted-foreground">Employee management and payroll.</p>
                </div>
                <AddEmployeeButton />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <KpiCard
                    title="Total Employees"
                    value={totalEmployees.toString()}
                    icon={Users}
                />
                <KpiCard
                    title="Monthly Payroll"
                    value={`$${(totalPayroll / 12).toLocaleString()}`}
                    icon={DollarSign}
                />
                <KpiCard
                    title="Attendance Rate"
                    value="98%"
                    trend="up"
                    change="+2%"
                    icon={Clock}
                />
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Position</th>
                            <th className="px-6 py-3">Department</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map((emp) => (
                            <tr key={emp.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{emp.first_name} {emp.last_name}</td>
                                <td className="px-6 py-4">{emp.position}</td>
                                <td className="px-6 py-4">{emp.department}</td>
                                <td className="px-6 py-4">{emp.email}</td>
                                <td className="px-6 py-4">{new Date(emp.join_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

import { DollarSign } from 'lucide-react'
