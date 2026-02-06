'use client'

import { useState } from 'react'
import { createUser } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CreateUserButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await createUser(formData)
        setIsLoading(false)

        if (res?.error) {
            alert(res.error)
        } else {
            setIsOpen(false)
            router.refresh()
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create User
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New User">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" name="email" type="email" required placeholder="user@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input id="password" name="password" type="password" required placeholder="********" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
                        <Input id="full_name" name="full_name" required placeholder="John Doe" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">Role</label>
                        <select
                            name="role"
                            aria-label="Role"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                            <option value="viewer">Viewer</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create User
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
