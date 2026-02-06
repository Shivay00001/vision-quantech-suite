'use client'

import { Bell, Search, Sparkles } from 'lucide-react'

export function Topbar() {
    return (
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <div className="flex items-center flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full h-9 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button aria-label="Notifications" className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                    <Bell className="h-5 w-5" />
                </button>

                <button aria-label="Ask AI" className="flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask AI
                </button>

                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    VQ
                </div>
            </div>
        </header>
    )
}
