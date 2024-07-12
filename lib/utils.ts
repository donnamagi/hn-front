import { cache } from 'react';
import { type ClassValue, clsx } from "clsx"
import { ArticleType } from '@/components/Article';
import { twMerge } from "tailwind-merge"
import { CommentType } from '@/components/Comment';

const HN_API = 'https://hacker-news.firebaseio.com/v0';
const BACKEND = 'https://api.hackernews.news';


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

export const fetchArticleIds = async (category:string, n: number): Promise<number[]> => {
  const cacheKey = `${category}_${n}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchHNData(
      `/${category}stories.json`
    );

    const sliced = data.slice(0, n);
    setInCache(cacheKey, sliced);

    return sliced;
  } catch (error) {
    console.error('Error fetching article IDs:', error);
    throw error;
  }
};

// Tries DB first, then falls back to HN API
export const fetchArticle = async (articleId: number): Promise<ArticleType> => {
  const cacheKey = `${articleId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }
  try {
    const data = await fetchBackendData(
      `/articles/${articleId}`
    )

    if (data.article) {
      setInCache(cacheKey, data.article);
      return data.article
    }
  } catch (error) {}

  try {
    return fetchHNArticle(articleId)
  } catch (error) {
    console.error('Error fetching article:', error)
    throw error
  }
}

// Tries HN API directly
export const fetchHNArticle = async (articleId: number): Promise<ArticleType> => {
  const cacheKey = `${articleId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }
  try {
    const data = await fetchHNData(
      `/item/${articleId}.json`
    )

    if (!data) {
      throw new Error('No article found')
    }

    setInCache(cacheKey, data);
    return data
  } catch (error) {
    throw error
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
    console.error('Error fetching articles:', error)
    throw error
  }
} 

export const fetchCommentIds = cache(async (articleId: number, kids: number[]): Promise<number[]> => {
  const cacheKey = `comments_${articleId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const commentIds = kids.slice(0, 5)
    setInCache(cacheKey, commentIds);

    return commentIds;

  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
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
    throw error;
  }
});

export const fetchSimilarArticles = cache(async (articleId: number): Promise<ArticleType[]> => {

  const cacheKey = `similars_${articleId}`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchBackendData(
      `/articles/similar/${articleId}`
    );

    setInCache(cacheKey, data.articles);
    return data.articles;

  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
})

export const fetchTopKeywords = cache(async (n: number) => {

  const cacheKey = `top_keywords`;
  if (cacheStore && cacheStore[cacheKey]) {
    return cacheStore[cacheKey];
  }

  try {
    const data = await fetchBackendData(
      `/keywords/top/${n}`
    );

    setInCache(cacheKey, data.top_keywords);
    return data.top_keywords;

  } catch (error) {
    console.error('Error fetching keywords:', error);
    throw error;
  }
})

export const fetchArticlesByKeywords = async (keywords: string[]) => {
  try {
    const data = await postBackendData(
      '/keywords/',
      { keywords }
    );

    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export const getLocalStorage = (item: string): string[] => {
  const localItem = localStorage.getItem(item)
  try {
    return localItem ? JSON.parse(localItem) : []
  } catch (error) {
    console.error('Error parsing interests:', error)
    return []
  }
}

export const setLocalStorage = (item: string, data: string) => {
  try {
    const existing = getLocalStorage(item)
    if (existing.includes(data)) {
      return data
    }

    existing.push(data);
    localStorage.setItem(item, JSON.stringify(existing))
    return data
  } catch (error) {
    console.error('Error setting interests:', error)
    return null
  }
}

export const removeLocalStorage = (item: string, data: string) => {
  try {
    const existing = getLocalStorage(item)
    if (!existing.includes(data)) {
      return data
    }

    const updated = existing.filter(item => item !== data);
    localStorage.setItem(item, JSON.stringify(updated))
    return data
  } catch (error) {
    console.error('Error removing interests:', error)
    return null
  }
}

const convertUnixTime = (time: string) => {
  const date = new Date(Number(time) * 1000);
  return date;
}

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
export const getRelativeTime = (time: string) => {
  let date = new Date(time);
  
  if (Number(time)) {
    // HN API sends back unix time
    date = convertUnixTime(time);
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  return formatRelativeTime(diff);
}

const formatRelativeTime = (diff: number) => {
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}
