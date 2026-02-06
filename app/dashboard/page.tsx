import { KpiCard } from '@/components/dashboard/kpi-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { DollarSign, Users, Briefcase, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your business performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Total Revenue"
                    value="$45,231.89"
                    change="+20.1%"
                    trend="up"
                    icon={DollarSign}
                />
                <KpiCard
                    title="Active Leads"
                    value="+2350"
                    change="+180.1%"
                    trend="up"
                    icon={Users}
                />
                <KpiCard
                    title="Pending Tasks"
                    value="12"
                    change="-10%"
                    trend="down"
                    icon={Briefcase}
                />
                <KpiCard
                    title="Compliance Alerts"
                    value="3"
                    change="+2"
                    trend="down" // down is bad here, but visually red implies attention needed
                    icon={AlertCircle}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
                    <RevenueChart />
                </div>
                <div className="col-span-3 bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center">
                                <div className="h-2 w-2 bg-primary rounded-full mr-3" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">New lead acquired</p>
                                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
