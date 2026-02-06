'use client'

import { useState } from 'react'
import { createInvoice } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddInvoiceButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await createInvoice(formData)
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
                New Invoice
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create New Invoice">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="invoice_number" className="text-sm font-medium">Invoice Number</label>
                        <Input id="invoice_number" name="invoice_number" required placeholder="INV-001" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="client_name" className="text-sm font-medium">Client Name</label>
                        <Input id="client_name" name="client_name" required placeholder="Acme Corp" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium">Amount ($)</label>
                        <Input id="amount" name="amount" type="number" required placeholder="5000" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="due_date" className="text-sm font-medium">Due Date</label>
                        <Input id="due_date" name="due_date" type="date" required />
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Invoice
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
