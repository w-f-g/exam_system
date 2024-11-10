import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import UpdatePassword from '@/pages/UpdatePassword'
import { Result } from 'antd'

declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: Record<string, any>
  }

  interface NonIndexRouteObject {
    meta?: Record<string, any>
  }
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    meta: {
      title: '首页',
    },
  },
  {
    path: 'login',
    element: <Login />,
    meta: {
      title: '登录',
    },
  },
  {
    path: 'register',
    element: <Register />,
    meta: {
      title: '注册',
    },
  },
  {
    path: 'update_password',
    element: <UpdatePassword />,
    meta: {
      title: '忘记密码',
    },
  },
  {
    path: '*',
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    ),
  },
]
