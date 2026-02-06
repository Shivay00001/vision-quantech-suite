'use client'

import { useState } from 'react'
import { createLead } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddLeadButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await createLead(formData)
        setIsLoading(false)

        if (res?.error) {
            alert(res.error) // Simple alert for now, can upgrade to toast
        } else {
            setIsOpen(false)
            router.refresh()
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Lead">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" name="name" required placeholder="John Doe" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">Company</label>
                        <Input id="company" name="company" placeholder="Acme Inc" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="value" className="text-sm font-medium">Potential Value ($)</label>
                        <Input id="value" name="value" type="number" placeholder="5000" />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Lead
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
