import { useUserStore } from '@/stores/user'
import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const WHITE_LIST = ['/login', '/register', '/update_password']

export const Auth = ({ children }: PropsWithChildren) => {
  const user = useUserStore((s) => s.user)
  const location = useLocation()
  console.log(location)

  const isGreenLight = WHITE_LIST.includes(location.pathname)

  if (user || isGreenLight) {
    return children
  }

  return (
    <Navigate
      replace
      to={{
        pathname: '/login',
        search:
          'redirect=' + encodeURIComponent(location.pathname + location.search),
      }}
    />
  )
}
