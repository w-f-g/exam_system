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
}
