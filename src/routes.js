import App from 'components/App'
import Home from 'components/Home'
import NotFound from 'components/NotFound'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
