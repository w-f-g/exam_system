import { useEffect } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { httpClient } from '@/utils'
import { message } from 'antd'
import { Auth } from '@/routers/middlewares/Auth'

function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe_400 = httpClient.on(400, (res) => {
      message.error(res.data.message)
    })

    const unsubscribe_401 = httpClient.on(401, () => {
      navigate('/login', { replace: true })
    })

    return () => {
      unsubscribe_400()
      unsubscribe_401()
    }
  }, [])
  return (
    <Auth>
      <Outlet />
    </Auth>
  )
}

export default AppLayout
