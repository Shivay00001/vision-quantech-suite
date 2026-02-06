'use server'

import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function addEmployee(formData: FormData) {
    const supabase = await createClient()

    const first_name = formData.get('first_name') as string
    const last_name = formData.get('last_name') as string
    const email = formData.get('email') as string
    const position = formData.get('position') as string
    const department = formData.get('department') as string
    const salary = parseFloat(formData.get('salary') as string) || 0
    const join_date = formData.get('join_date') as string

    const { error } = await supabase.from('hr_employees').insert({
        first_name,
        last_name,
        email,
        position,
        department,
        salary,
        join_date
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard/hr')
    return { success: true }
}
