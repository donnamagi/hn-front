export type NavLink = {
  label: string;
  description: string;
};

export type NavMap = {
  [key: string]: NavLink;
};

export const MAIN_NAV: NavMap = {
  '/': { label: 'Home', description: 'The home page' },
  '/custom': { label: 'Feed', description: 'Your custom feed' },
  '/best': { label: 'Best', description: 'Most popular stories this week' },
  '/top': { label: 'Top', description: 'Gaining traction right now' },
  '/show': { label: 'Show', description: 'What the community is building' }
};


export const HN_API = 'https://hacker-news.firebaseio.com/v0';
export const BACKEND = 'https://api.hackernews.news';
