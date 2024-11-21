import { Inject, Injectable } from '@nestjs/common'
import { RedisClientType } from 'redis'

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  keys(pattern: string) {
    return this.redisClient.keys(pattern)
  }

  get(key: string) {
    return this.redisClient.get(key)
  }

  set(key: string, value: string | number, ttl?: number) {
    this.redisClient.set(key, value, {
      EX: ttl,
    })
  }

  zRankingList(key: string, start: number = 0, end: number = -1) {
    return this.redisClient.zRange(key, start, end, { REV: true })
  }

  zAdd(key: string, members: Record<string, number>) {
    const mems = Object.entries(members).map(([k, v]) => {
      return {
        value: k,
        score: v,
      }
    })
    return this.redisClient.zAdd(key, mems)
  }
}

export const InjectRedisService = Inject(RedisService)
