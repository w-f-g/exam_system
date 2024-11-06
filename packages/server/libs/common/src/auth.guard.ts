import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'

type JwtUserData = {
  userId: number
  username: string
}

declare module 'express' {
  interface Request {
    user: JwtUserData
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private reflector: Reflector

  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ])

    if (!requireLogin) {
      return true
    }

    const token = request.headers.authorization

    if (!token) {
      throw new UnauthorizedException('用户未登录')
    }

    try {
      const data = this.jwtService.verify<JwtUserData>(token)

      const user = {
        userId: data.userId,
        username: data.username,
      }
      request.user = user
      response.header(
        'token',
        this.jwtService.sign(user, {
          expiresIn: '7d',
        }),
      )
      return true
    } catch (e) {
      throw new UnauthorizedException('token 失效，请重新登录')
    }
  }
}
