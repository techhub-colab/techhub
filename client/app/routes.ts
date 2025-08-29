import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('login', 'routes/login.tsx'),
    route('about', 'routes/about.tsx'),
    route('settings', 'routes/settings/layout.tsx', [
      route('profile', 'routes/settings/profile.tsx'),
      route('account', 'routes/settings/account.tsx')
    ])
  ]),
  route('blogs/create', 'routes/blogs/create.tsx')
] satisfies RouteConfig;
