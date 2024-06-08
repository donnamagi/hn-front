import { cache } from 'react';
import { type ClassValue, clsx } from "clsx"
import { ArticleType } from '@/components/Article';
import { twMerge } from "tailwind-merge"
import { CommentType } from '@/components/Comment';

const cacheStore: { [key: string]: any } = {};

export const getFromCache = (key: string) => {
  return cacheStore[key];
};

export const setInCache = (key: string, value: any) => {
  cacheStore[key] = value;
};

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
  const cacheKey = `${storyId}`;
  const cache = getFromCache(cacheKey);

  if (cache) {
    console.log(`Returning cached article: ${storyId}`);
    return cache;
  }
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data: ArticleType = await response.json()
    setInCache(cacheKey, data);
    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    return {} as ArticleType
  }
})

export const fetchComments = cache(async (storyId: number, kids: number[]): Promise<CommentType[]> => {
  const cacheKey = `comments_${storyId}`;
  const cache = getFromCache(cacheKey);

  if (cache) {
    console.log(`Returning cached comments for: ${storyId}`);
    return cache;
  }

  try {
    const commentIds = kids.slice(0, 5)

    const comments = await Promise.all(commentIds.map(async (commentId) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json() as CommentType;
      return data;
      }));

    setInCache(cacheKey, comments);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
});
