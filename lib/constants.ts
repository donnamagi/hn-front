export type NavLink = {
  href: string;
  label: string;
};

export type Nav = NavLink[];


export const MAIN_NAV: Nav = [
  { href: '/best', label: 'Best' },
  { href: '/top', label: 'Top' },
  { href: '/new', label: 'New' },
  { href: '/ask', label: 'Ask HN' },
  { href: '/show', label: 'Show HN' },
  { href: '/jobs', label: 'Jobs' }
];
