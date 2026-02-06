import { createClient } from '@/lib/supabaseServer'

const stages = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']

export default async function CrmLeadsPage() {
    const supabase = await createClient()
    const { data: leads } = await supabase.from('crm_leads').select('*')

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Pipeline</h2>
                <p className="text-muted-foreground">Drag and drop leads to move them through stages.</p>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-4 min-w-max h-full pb-4">
                    {stages.map((stage) => {
                        const stageLeads = leads?.filter((l) => l.status === stage) || []
                        return (
                            <div key={stage} className="w-80 bg-muted/50 rounded-lg p-4 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium capitalize">{stage}</h3>
                                    <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
                                        {stageLeads.length}
                                    </span>
                                </div>

                                <div className="space-y-3 flex-1 overflow-y-auto">
                                    {stageLeads.map((lead) => (
                                        <div key={lead.id} className="bg-card p-4 rounded-md border shadow-sm cursor-move hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-sm">{lead.name}</h4>
                                                <span className="text-xs font-bold text-primary">
                                                    ${lead.value?.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3">{lead.company}</p>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                                <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
