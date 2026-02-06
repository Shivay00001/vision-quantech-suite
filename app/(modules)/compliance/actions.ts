'use server'

import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function createTask(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const due_date = formData.get('due_date') as string
    const priority = formData.get('priority') as string
    const status = 'pending'

    const { error } = await supabase.from('compliance_tasks').insert({
        title,
        due_date,
        priority,
        status
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/compliance')
    return { success: true }
}
