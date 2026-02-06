import { createClient } from '@/lib/supabaseServer'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { DollarSign, FileText, TrendingUp, AlertTriangle } from 'lucide-react'
import { AddInvoiceButton } from './add-invoice-button'

export default async function FinancePage() {
    const supabase = await createClient()
    const { data: invoices } = await supabase.from('finance_invoices').select('*')

    const totalRevenue = invoices?.filter(i => i.status === 'paid').reduce((acc, i) => acc + (i.amount || 0), 0) || 0
    const pendingAmount = invoices?.filter(i => i.status === 'pending').reduce((acc, i) => acc + (i.amount || 0), 0) || 0

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
                    <p className="text-muted-foreground">Invoices, expenses, and financial overview.</p>
                </div>
                <AddInvoiceButton />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <KpiCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                />
                <KpiCard
                    title="Pending Invoices"
                    value={`$${pendingAmount.toLocaleString()}`}
                    icon={FileText}
                />
                <KpiCard
                    title="Net Profit"
                    value={`$${(totalRevenue * 0.8).toLocaleString()}`} // Mock profit margin
                    icon={TrendingUp}
                />
                <KpiCard
                    title="Overdue"
                    value="$0.00"
                    icon={AlertTriangle}
                />
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-medium">Recent Invoices</h3>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-6 py-3">Invoice #</th>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices?.map((inv) => (
                            <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{inv.invoice_number}</td>
                                <td className="px-6 py-4">{inv.client_name}</td>
                                <td className="px-6 py-4">${inv.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                                            inv.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(inv.due_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
