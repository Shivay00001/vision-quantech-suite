import { NextResponse } from 'next/server'
import { generateAiResponse } from '@/lib/ai-service'

export async function POST(request: Request) {
    const { prompt } = await request.json()

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const response = await generateAiResponse(prompt)
    return NextResponse.json({ response })
}
