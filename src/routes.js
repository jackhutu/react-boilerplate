import App from 'pages/app'
import Home from 'pages/home'
import NotFound from 'pages/notfound'
import ShopCart from 'pages/shopcart'

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
      {
        path: '*',
        component: NotFound
      }
    ]
  }
]

export default routes
