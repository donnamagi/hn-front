import { useState, useEffect } from 'react';
import { fetchArticleIds, fetchDbArticlesById, fetchArticle } from '@/lib/utils';
import { ArticleType } from '@/components/Article';


export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [articleIds, setArticleIds] = useState<number[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      if (articleIds.length === 0) return;

      const res = await fetchDbArticlesById(articleIds);
      setArticles(res.articles);

      if (res.missing_ids.length > 0) {
        const missingArticles = await Promise.all(
          res.missing_ids.map(async (id:number) => await fetchArticle(id))
        );
        setArticles(prevArticles => [...prevArticles, ...missingArticles]);
      }
    };

    fetchArticles();
  }, [articleIds]);

  const getArticles = async (category:string, n:number) => {
    try {
      const data = await fetchArticleIds(category, n);
      setArticleIds(data);
    } catch (err) {
      console.error('Error fetching article IDs:', err);
    }
  };

  return { articles, articleIds, getArticles };
};
