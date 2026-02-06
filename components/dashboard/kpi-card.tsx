import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KpiCardProps {
    title: string
    value: string
    change?: string
    trend?: 'up' | 'down' | 'neutral'
    icon: LucideIcon
    className?: string
}

export function KpiCard({ title, value, change, trend, icon: Icon, className }: KpiCardProps) {
    return (
        <div className={cn("bg-card p-6 rounded-lg border shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            {change && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={cn(
                            "font-medium",
                            trend === 'up' ? "text-green-600" : trend === 'down' ? "text-red-600" : "text-muted-foreground"
                        )}
                    >
                        {change}
                    </span>
                    <span className="text-muted-foreground ml-2">from last month</span>
                </div>
            )}
        </div>
    )
}
