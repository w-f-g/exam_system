import { getUserState } from '@/stores/user'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

type TResponse = {
  data: any
  status: number | string
  [k: string]: any
}

type TaskFun = (res: TResponse) => void

class HttpClient {
  request: AxiosInstance
  private listeners: Map<number | string | RegExp, TaskFun[]> = new Map()

  constructor() {
    const req = axios.create({
      baseURL: '/api',
    })
    this.request = req

    req.interceptors.request.use(
      (config) => this.onRequestFulfilled(config),
      (err) => this.onRequestRejected(err),
    )

    req.interceptors.response.use(
      (response) => this.onResponseFulfilled(response),
      (err: AxiosError) => this.onResponseRejected(err),
    )
  }

  private onRequestFulfilled(
    config: InternalAxiosRequestConfig<any>,
  ): InternalAxiosRequestConfig<any> {
    const { token } = getUserState()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  }

  private onRequestRejected(err: any) {
    console.log(err)
    return err
  }

  private onResponseFulfilled(
    response: AxiosResponse<any, any>,
  ): AxiosResponse<any, any> {
    this.emit(response)

    return response
  }

  private onResponseRejected(err: AxiosError) {
    console.log(err)
    this.emit(err.response!)

    return err
  }

  on(status: number | string | RegExp, cb: TaskFun) {
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

  private emit(response: TResponse) {
    const { status } = response
    Array.from(this.listeners).map(([k, tasks]) => {
      let flag = false
      if (k instanceof RegExp) {
        flag = k.test(status.toString())
      } else {
        flag = k.toString() === status.toString()
      }
      if (flag) {
        tasks?.forEach((task) => task(response))
      }
    })
  }
}

export const httpClient = new HttpClient()

export const request = <R>(config: AxiosRequestConfig) => {
  return httpClient.request<R>(config)
}
