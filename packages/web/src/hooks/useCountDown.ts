import { useEffect, useRef, useState } from 'react'

type TCaptchaState = {
  state: 'FINISH' | 'PENDING'
  countDown: number
}

export const COUNT_DOWN = 60
// 获取验证码倒计时
export default function useCountDown() {
  // 短信验证码的状态
  const [captchaState, setCaptchaState] = useState<TCaptchaState>({
    state: 'FINISH',
    countDown: COUNT_DOWN,
  })

  const timer = useRef<number | null>(null)

  useEffect(() => {
    setCaptchaState({
      state: 'FINISH',
      countDown: COUNT_DOWN,
    })
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  const updateCountDown = (count: number) => {
    const countDown = count - 1
    setCaptchaState({
      state: 'PENDING',
      countDown,
    })
    if (timer.current) {
      clearTimeout(timer.current)
    }
    if (countDown === 0) {
      setCaptchaState({
        state: 'FINISH',
        countDown: COUNT_DOWN,
      })
      return
    }
    timer.current = setTimeout(() => {
      updateCountDown(countDown)
    }, 1000)
  }

  return {
    captchaState,
    updateCountDown,
  }
}
