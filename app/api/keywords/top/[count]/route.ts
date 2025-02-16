import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ count: string }> }
) {
  try {
    const { count } = await params
    const numericCount = parseInt(count)
    if (isNaN(numericCount) || numericCount < 1) {
      return NextResponse.json(
        { error: 'Invalid count parameter' },
        { status: 400 }
      )
    }

    const top_keywords = {}
    return NextResponse.json({ top_keywords })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch top keywords' },
      { status: 500 }
    )
  }
} 