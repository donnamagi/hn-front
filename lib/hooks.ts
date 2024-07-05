import { useState, useEffect } from 'react';
import { fetchArticleIds, fetchDbArticlesById, fetchHNArticle } from '@/lib/utils';
import { ArticleType } from '@/components/Article';


export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([])
  const [articleIds, setArticleIds] = useState<number[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      if (articleIds.length === 0) return;
  
      try {
        const res = await fetchDbArticlesById(articleIds);
        setArticles(res.articles);
  
        if (res.missing_ids.length > 0) {
          const missingArticles = await Promise.all(
            res.missing_ids.map(async (id:number) => await fetchHNArticle(id))
          );

          setArticles(prevArticles => [...prevArticles, ...missingArticles]);
        }
      } catch (error) {
        console.error('Error fetching articles from DB, falling back to HN API only:', error);
  
        const backupArticles = await Promise.all(
          articleIds.map(async (id) => {
            try {
              return await fetchHNArticle(id);
            } catch (backupError) {
              console.error('Error fetching article on backup', id, backupError);
              return null;
            }
          })
        ).then(articles => {
          // if HN is also down for some reason, we need to filter out the failed calls
          return articles.filter(article => article !== null) as ArticleType[];
        });

        setArticles(backupArticles);

        if (backupArticles.length !== articleIds.length) {
          // remove the ids that could not be fetched
          setArticleIds(prevIds => prevIds.filter(id => {
            return !backupArticles.find(article => article && article.id === id);
          }));
        }
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
