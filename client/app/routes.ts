import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    index('routes/home.tsx'),
    route('login', 'routes/login.tsx'),
    route('about', 'routes/about.tsx')
  ]),
  route('blogs/create', 'routes/blogs/create.tsx')
] satisfies RouteConfig;
