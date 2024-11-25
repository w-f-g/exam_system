import { routes } from '@/routers'
import { Suspense, useEffect, useMemo } from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'
import Loading from '@/components/Loading'

export default function App() {
  const element = useRoutes(routes)

  const route = useMemo(() => {
    return element?.props.match.route as RouteObject
  }, [element])

  useEffect(() => {
    const title = route.meta?.title
    document.title = `考试系统${title ? '-' + title : ''}`
  }, [route])

  return <Suspense fallback={<Loading />}>{element}</Suspense>
}
