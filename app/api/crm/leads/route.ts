import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('crm_leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const supabase = await createClient()
    const json = await request.json()

    const { data, error } = await supabase
        .from('crm_leads')
        .insert(json)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
