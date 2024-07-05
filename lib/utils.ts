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
    return [];
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
    const data = await fetchHNData(
      `/item/${articleId}.json`
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
    return [];
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
    return [];
  }
})
