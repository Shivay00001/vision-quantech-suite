'use server'

import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function createInvoice(formData: FormData) {
    const supabase = await createClient()

    const invoice_number = formData.get('invoice_number') as string
    const client_name = formData.get('client_name') as string
    const amount = parseFloat(formData.get('amount') as string) || 0
    const due_date = formData.get('due_date') as string
    const status = 'pending'

    const { error } = await supabase.from('finance_invoices').insert({
        invoice_number,
        client_name,
        amount,
        due_date,
        status
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/finance')
    return { success: true }
}
