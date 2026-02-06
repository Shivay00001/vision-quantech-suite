'use client'

import { useState } from 'react'
import { createTask } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddTaskButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await createTask(formData)
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
                Add Task
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Compliance Task">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Task Title</label>
                        <Input id="title" name="title" required placeholder="GST Filing" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="due_date" className="text-sm font-medium">Due Date</label>
                        <Input id="due_date" name="due_date" type="date" required />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                        <select
                            name="priority"
                            aria-label="Priority"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Task
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
