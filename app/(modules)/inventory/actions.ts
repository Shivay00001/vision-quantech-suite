'use server'

import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const sku = formData.get('sku') as string
    const price = parseFloat(formData.get('price') as string) || 0
    const stock_quantity = parseInt(formData.get('stock_quantity') as string) || 0
    const low_stock_threshold = parseInt(formData.get('low_stock_threshold') as string) || 10

    const { error } = await supabase.from('inventory_products').insert({
        name,
        sku,
        price,
        stock_quantity,
        low_stock_threshold
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/inventory')
    return { success: true }
}
