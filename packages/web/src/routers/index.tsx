import { RouteObject } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import UpdatePassword from '@/pages/UpdatePassword'
import Edit from '@/pages/Edit'
import NotFound from '@/pages/NotFound'
import { QuestionProvider } from '@/pages/Edit/QuestionContext'
import Exam from '@/pages/Exam'
import Result from '@/pages/Result'

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
    path: 'edit/:id',
    element: (
      <QuestionProvider>
        <Edit />
      </QuestionProvider>
    ),
  },
  {
    path: 'exam/:id',
    element: <Exam />,
  },
  {
    path: 'res/:id',
    element: <Result />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
