import { cache } from 'react';
import { type ClassValue, clsx } from "clsx"
import { ArticleType } from '@/components/Article';
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchStoryIds = cache(async (category:string): Promise<number[]> => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/${category}stories.json`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.slice(0, 30);
  } catch (error) {
    console.error('Error fetching story IDs:', error);
    return [];
  }
});

export const fetchArticle = cache(async (storyId: number): Promise<ArticleType> => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: ArticleType = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    return {} as ArticleType
  }
})
