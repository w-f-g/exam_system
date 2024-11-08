import { getUserState } from '@/stores/user'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

type TaskFun = (res: AxiosResponse) => void

class HttpClient {
  request: AxiosInstance
  private listeners: Map<number, TaskFun[]> = new Map()

  constructor() {
    const req = axios.create({
      baseURL: '/',
    })
    this.request = req

    req.interceptors.request.use(
      (config) => {
        const { token } = getUserState()
        if (token) {
          config.headers['Authorization'] = token
        }
        return config
      },
      (err) => err,
    )

    const emit = (response: AxiosResponse) => {
      const { status } = response
      const tasks = this.listeners.get(status)
      tasks?.forEach((task) => task(response))
    }

    req.interceptors.response.use(
      (response) => {
        emit(response)

        return response
      },
      (err: AxiosError) => {
        console.log(err)
        emit(err.response!)

        return err
      },
    )
  }

  on(status: number, cb: TaskFun) {
    let index = 0
    if (this.listeners.has(status)) {
      const tasks = this.listeners.get(status)!
      index = tasks.length
      tasks.push(cb)
    } else {
      this.listeners.set(status, [cb])
    }
    return () => {
      const tasks = this.listeners.get(status)!
      tasks.splice(index, 1)
    }
  }
}

export const httpClient = new HttpClient()

export const request = <R>(config: AxiosRequestConfig) => {
  return httpClient.request<R>(config)
}
