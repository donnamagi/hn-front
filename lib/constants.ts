type NavLink = {
  href: string;
  label: string;
};

type Nav = {
  [key: string]: NavLink;
};

export const MAIN_NAV: Nav = {
  best: { href: '/best', label: 'Best' },
  top: { href: '/top', label: 'Top' },
  new: { href: '/new', label: 'New' },
  ask: { href: '/ask', label: 'Ask HN' },
  show: { href: '/show', label: 'Show HN' },
  jobs: { href: '/jobs', label: 'Jobs' }
};