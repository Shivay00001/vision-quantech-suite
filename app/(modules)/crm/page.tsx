import { createClient } from '@/lib/supabaseServer'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { Users, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { AddLeadButton } from './add-lead-button'

export default async function CrmPage() {
    const supabase = await createClient()
    const { data: leads } = await supabase.from('crm_leads').select('*')

    const totalLeads = leads?.length || 0
    const totalValue = leads?.reduce((acc, lead) => acc + (lead.value || 0), 0) || 0
    const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">CRM</h2>
                    <p className="text-muted-foreground">Manage your leads and pipeline.</p>
                </div>
                <div className="flex gap-2">
                    <AddLeadButton />
                    <Link
                        href="/dashboard/crm/leads"
                        className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                    >
                        View Pipeline
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <KpiCard
                    title="Total Leads"
                    value={totalLeads.toString()}
                    icon={Users}
                />
                <KpiCard
                    title="Pipeline Value"
                    value={`$${totalValue.toLocaleString()}`}
                    icon={DollarSign}
                />
                <KpiCard
                    title="Qualified Leads"
                    value={qualifiedLeads.toString()}
                    icon={TrendingUp}
                />
            </div>

            <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Recent Leads</h3>
                <div className="space-y-4">
                    {leads?.slice(0, 5).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div>
                                <p className="font-medium">{lead.name}</p>
                                <p className="text-sm text-muted-foreground">{lead.company}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">${lead.value?.toLocaleString()}</p>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                                    {lead.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
