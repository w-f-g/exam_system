import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import UpdatePassword from '@/pages/UpdatePassword'
import AppLayout from '@/layouts/AppLayout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'update_password',
        element: <UpdatePassword />,
      },
    ],
  },
]

const routers = createBrowserRouter(routes)

export default routers
