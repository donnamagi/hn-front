import { cache } from 'react';
import { type ClassValue, clsx } from "clsx"
import { ArticleType } from '@/components/Article';
import { twMerge } from "tailwind-merge"
import { CommentType } from '@/components/Comment';
import { HN_API, BACKEND } from '@/lib/constants';

const cacheStore: { [key: string]: any } = {};


export const setInCache = (key: string, value: any) => {
  cacheStore[key] = value;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const fetchBackendData = async (path: string) => {

  const response = await fetch(BACKEND + path);
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  return response.json();
}

const fetchHNData = async (path: string) => {

  const response = await fetch(HN_API + path);
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  return response.json();
}

const postBackendData = async (path: string, data: any) => {

  const response = await fetch( BACKEND + path , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Response not OK');
  }

  return response.json();
}

export const fetchStoryIds = async (category:string): Promise<number[]> => {
  const cacheKey = `${category}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchHNData(
      `/${category}stories.json`
    );

    const sliced = data.slice(0, 30);
    setInCache(cacheKey, sliced);

    return sliced;
  } catch (error) {
    console.error('Error fetching story IDs:', error);
    return [];
  }
};

// Tries DB first, then falls back to HN API
export const fetchArticle = async (storyId: number): Promise<ArticleType> => {
  const cacheKey = `${storyId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }
  try {
    const data = await fetchBackendData(
      `/articles/${storyId}`
    )

    if (data.article) {
      setInCache(cacheKey, data.article);
      return data.article
    }
  } catch (error) {}

  try {
    const data = await fetchHNData(
      `/item/${storyId}.json`
    )

    if (!data) {
      throw new Error('No article found')
    }

    setInCache(cacheKey, data);
    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    return {} as ArticleType
  }
}

export const fetchDbArticlesById = async (ids: number[]) => {
  try { 
    const data = await postBackendData(
      '/articles/', 
      { ids }
    )

    data.articles.forEach((article: ArticleType) => {
      setInCache(`${article.id}`, article)
    })

    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    return {} as ArticleType
  }
}

export const fetchThisWeeksArticles = async (): Promise<ArticleType[]> => {
  try {
    const data = await fetchBackendData(
      '/articles/week'
    )

    data.articles.forEach((article: ArticleType) => {
      setInCache(`${article.id}`, article)
    })

    return data.articles
  } catch (error) {
    console.error('Error fetching article:', error)
    return []
  }
}

export const fetchCommentIds = cache(async (storyId: number, kids: number[]): Promise<number[]> => {
  const cacheKey = `comments_${storyId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const commentIds = kids.slice(0, 5)
    setInCache(cacheKey, commentIds);

    return commentIds;

  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
});

export const fetchComment = cache(async (commentId: number): Promise<CommentType> => {
  const cacheKey = `comment_${commentId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchHNData(
      `/item//${commentId}.json`
    );

    setInCache(cacheKey, data);
    return data;

  } catch (error) {
    console.error('Error fetching comments:', error);
    return {} as CommentType;
  }
});

export const fetchSimilarArticles = cache(async (storyId: number): Promise<ArticleType[]> => {

  const cacheKey = `similars_${storyId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchBackendData(
      `/articles/similar/${storyId}`
    );

    setInCache(cacheKey, data.articles);
    return data.articles;

  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
})
