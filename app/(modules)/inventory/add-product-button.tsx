'use client'

import { useState } from 'react'
import { addProduct } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AddProductButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const res = await addProduct(formData)
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
                Add Product
            </Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Product">
                <form action={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                        <Input id="name" name="name" required placeholder="Laptop" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="sku" className="text-sm font-medium">SKU</label>
                        <Input id="sku" name="sku" required placeholder="PROD-001" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-medium">Price ($)</label>
                            <Input id="price" name="price" type="number" required placeholder="100" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="stock_quantity" className="text-sm font-medium">Stock</label>
                            <Input id="stock_quantity" name="stock_quantity" type="number" required placeholder="50" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="low_stock_threshold" className="text-sm font-medium">Low Alert</label>
                            <Input id="low_stock_threshold" name="low_stock_threshold" type="number" placeholder="10" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Product
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
