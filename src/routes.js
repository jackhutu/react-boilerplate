import App from 'pages/app'
import Home from 'pages/home'
import NotFound from 'pages/notfound'
import ShopCart from 'pages/shopcart'
import Async from 'pages/async'

const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/shopcart',
        exact: true,
        component: ShopCart
      },
      { path: '/async',
        exact: true,
        component: Async
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
