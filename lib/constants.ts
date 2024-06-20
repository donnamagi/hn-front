export type NavLink = {
  href: string;
  label: string;
};

export type Nav = NavLink[];


export const MAIN_NAV: Nav = [
  { href: '/week', label: 'Week'},
  { href: '/best', label: 'Best' },
  { href: '/top', label: 'Top' },
  { href: '/new', label: 'New' },
  { href: '/ask', label: 'Ask' },
  { href: '/show', label: 'Show' }
];
