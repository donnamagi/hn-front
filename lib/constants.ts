export type NavLink = {
  href: string;
  label: string;
};

export type Nav = NavLink[];


export const MAIN_NAV: Nav = [
  { href: '/best', label: 'Best' },
  { href: '/top', label: 'Top' },
  { href: '/show', label: 'Show' }
];


export const HN_API = 'https://hacker-news.firebaseio.com/v0';
export const BACKEND = 'https://api.hackernews.news';
