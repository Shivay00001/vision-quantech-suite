export async function generateAiResponse(prompt: string) {
    const apiKey = process.env.APIFREE_API_KEY

    if (!apiKey) {
        // Fallback mock response if no key is present
        return "I am an AI assistant. Please configure your API key to get real responses. I can help you with CRM summaries, compliance checks, and more."
    }

    try {
        const response = await fetch('https://api.apifree.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // or whatever model apifree supports
                messages: [{ role: 'user', content: prompt }]
            })
        })

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('AI Service Error:', error)
        return "Sorry, I encountered an error processing your request."
    }
}
