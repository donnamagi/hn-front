import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { count: string } }
) {
  try {
    const count = parseInt(params.count)
    if (isNaN(count) || count < 1) {
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