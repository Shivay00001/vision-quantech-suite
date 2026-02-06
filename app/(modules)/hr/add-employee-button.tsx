'use client'

import { useState } from 'react'
import { addEmployee } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddEmployeeButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await addEmployee(formData)
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
                Add Employee
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Employee">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                            <Input id="first_name" name="first_name" required placeholder="Jane" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                            <Input id="last_name" name="last_name" required placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="position" className="text-sm font-medium">Position</label>
                            <Input id="position" name="position" placeholder="Manager" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="department" className="text-sm font-medium">Department</label>
                            <Input id="department" name="department" placeholder="Sales" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="salary" className="text-sm font-medium">Salary</label>
                            <Input id="salary" name="salary" type="number" placeholder="80000" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="join_date" className="text-sm font-medium">Join Date</label>
                            <Input id="join_date" name="join_date" type="date" required />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Employee
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
