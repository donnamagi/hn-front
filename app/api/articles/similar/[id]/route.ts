import { NextResponse } from 'next/server'
import { milvusService } from '@/services/milvus'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const articleId = parseInt(id)
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      )
    }

    const results = await milvusService.getSimilar(articleId);
    const similarIds = results.map(result => result.id);
    
    return NextResponse.json({ similarIds })
  } catch (error) {
    console.error('Error fetching similar articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch similar articles' },
      { status: 500 }
    )
  }
} 