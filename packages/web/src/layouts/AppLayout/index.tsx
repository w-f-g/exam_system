import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { httpClient } from '@/utils'
import { message } from 'antd'
import { Auth } from '@/routers/middlewares/Auth'

function AppLayout() {
  useEffect(() => {
    const unsubscribe = httpClient.on(400, (res) => {
      message.error(res.data.message)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <Auth>
      <Outlet />
    </Auth>
  )
}

export default AppLayout
