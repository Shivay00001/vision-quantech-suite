'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
    // 1. Verify requester is an admin
    const supabase = await createClient()
    const { data: { user: requester } } = await supabase.auth.getUser()

    if (!requester) {
        return { error: 'Unauthorized' }
    }

    const { data: requesterProfile } = await supabase
        .from('users')
        .select('role')
        .eq('id', requester.id)
        .single()

    if (requesterProfile?.role !== 'superadmin' && requesterProfile?.role !== 'admin') {
        return { error: 'Insufficient permissions' }
    }

    // 2. Extract data
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('full_name') as string
    const role = formData.get('role') as string

    // 3. Create Auth User
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authUser.user) {
        return { error: 'Failed to create user' }
    }

    // 4. Create Public Profile
    // Note: We use supabaseAdmin here to bypass RLS if needed, though RLS might allow admins.
    // Using admin client ensures it works regardless of current RLS for 'insert'.
    const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({
            id: authUser.user.id,
            email,
            full_name: fullName,
            role
        })

    if (profileError) {
        // Optional: Cleanup auth user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
        return { error: profileError.message }
    }

    revalidatePath('/dashboard/admin')
    return { success: true }
}
