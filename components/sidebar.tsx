'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    ShieldCheck,
    Package,
    Settings,
    LogOut,
    ShieldAlert
} from 'lucide-react'
import { logout } from '@/app/auth/actions'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'CRM', href: '/dashboard/crm', icon: Users },
    { name: 'HR', href: '/dashboard/hr', icon: Briefcase },
    { name: 'Finance', href: '/dashboard/finance', icon: FileText },
    { name: 'Compliance', href: '/dashboard/compliance', icon: ShieldCheck },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Admin', href: '/dashboard/admin', icon: ShieldAlert },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full bg-card border-r w-64">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary tracking-tight">
                    VisionQuantech
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors',
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t space-y-1">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors"
                >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </Link>
                <button
                    onClick={() => logout()}
                    className="flex w-full items-center px-4 py-3 text-sm font-medium text-destructive rounded-md hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    )
}
