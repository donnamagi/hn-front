import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { ids } = await request.json()
    
    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { error: 'Invalid request body - ids must be an array' },
        { status: 400 }
      )
    }

    const data = {}
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
} 