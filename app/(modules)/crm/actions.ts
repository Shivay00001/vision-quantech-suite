'use server'

import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function createLead(formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const value = parseFloat(formData.get('value') as string) || 0
    const status = 'new'

    const { error } = await supabase.from('crm_leads').insert({
        name,
        email,
        company,
        value,
        status
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/crm')
    revalidatePath('/dashboard/crm/leads')
    return { success: true }
}

export async function updateLeadStatus(leadId: string, newStatus: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('crm_leads')
        .update({ status: newStatus })
        .eq('id', leadId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/crm/leads')
    return { success: true }
}
