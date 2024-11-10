import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpClient } from '@/utils'
import { message } from 'antd'

function HttpWrapper({ children }: PropsWithChildren) {
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

  return children
}

export default HttpWrapper
