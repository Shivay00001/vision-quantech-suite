'use client'

import { useState } from 'react'
import { X, Send, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AiPanel() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: 'Hello! I am your VisionQuantech AI assistant. How can I help you today?' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = input
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setInput('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMessage })
            })
            const data = await res.json()
            setMessages(prev => [...prev, { role: 'ai', content: data.response }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, something went wrong.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Open AI Assistant"
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50",
                    isOpen && "hidden"
                )}
            >
                <Sparkles className="h-6 w-6" />
            </button>

            <div
                className={cn(
                    "fixed inset-y-0 right-0 w-96 bg-card border-l shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="p-4 border-b flex items-center justify-between bg-muted/20">
                    <div className="flex items-center">
                        <Sparkles className="h-5 w-5 text-primary mr-2" />
                        <h3 className="font-semibold">AI Assistant</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} aria-label="Close AI Assistant" className="p-2 hover:bg-muted rounded-full">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex w-full",
                                msg.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                                    msg.role === 'user'
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Thinking...
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t">
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setInput("Summarize compliance status")}
                            className="whitespace-nowrap px-3 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20"
                        >
                            Summarize compliance
                        </button>
                        <button
                            onClick={() => setInput("Predict revenue next quarter")}
                            className="whitespace-nowrap px-3 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20"
                        >
                            Predict revenue
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything..."
                            className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            aria-label="Send message"
                            className="h-10 w-10 flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
