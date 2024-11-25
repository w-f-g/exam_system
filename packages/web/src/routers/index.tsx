import { RouteObject } from 'react-router-dom'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import { lazy } from 'react'

declare module 'react-router-dom' {
  interface IndexRouteObject {
    meta?: Record<string, any>
  }

  interface NonIndexRouteObject {
    meta?: Record<string, any>
  }
}

const Home = lazy(() => import('@/pages/Home'))
const Edit = lazy(() => import('@/pages/Edit'))
const Register = lazy(() => import('@/pages/Register'))
const UpdatePassword = lazy(() => import('@/pages/UpdatePassword'))
const Exam = lazy(() => import('@/pages/Exam'))
const Result = lazy(() => import('@/pages/Result'))

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
    element: <Edit />,
    meta: {
      title: '编辑试卷',
    },
  },
  {
    path: 'exam/:id',
    element: <Exam />,
    meta: {
      title: '答题页面',
    },
  },
  {
    path: 'res/:id',
    element: <Result />,
    meta: {
      title: '考试结果',
    },
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
