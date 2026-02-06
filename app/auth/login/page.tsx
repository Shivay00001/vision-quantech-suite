'use client'

import { useState } from 'react'
import { login, signup } from '../actions'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        const action = isLogin ? login : signup
        const result = await action(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        }
        // If success, the action will redirect, so we don't need to set loading false
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">
                        VisionQuantech
                    </h1>
                    <p className="text-muted-foreground">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </p>
                </div>

                <div className="bg-card border rounded-lg shadow-sm p-8">
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:underline underline-offset-4"
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
