import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { AiPanel } from '@/components/ai-panel'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
            <AiPanel />
        </div>
    )
}
