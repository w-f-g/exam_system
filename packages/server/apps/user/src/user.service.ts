import { InjectPrismaService, PrismaService } from '@app/prisma'
import { InjectRedisService, RedisService } from '@app/redis'
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { EmailService, InjectEmailService } from '@app/email'
import {
  UserLoginDto,
  UserRegisterDto,
  UserUpdatePasswordDto,
} from './dto/user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  @InjectRedisService
  private redisService: RedisService

  @InjectPrismaService
  private prismaService: PrismaService

  @InjectEmailService
  private emailService: EmailService

  @Inject(JwtService)
  private jwtService: JwtService

  private logger = new Logger()

  async send_captcha(address: string) {
    const code = Math.random().toString().slice(2, 8)
    await this.redisService.set(`captcha_${address}`, code, 5 * 60)
    await this.emailService.sendEmail(
      address,
      '注册验证码',
      `<p>你的注册验证码是 ${code}</p>`,
    )
  }

  async create(user: UserRegisterDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`)

    if (!captcha) {
      throw new BadRequestException('验证码已失效')
    }

    if (user.captcha !== captcha) {
      throw new BadRequestException('验证码不正确')
    }

    const u = await this.prismaService.user.findUnique({
      where: {
        username: user.username,
      },
    })
    if (u) {
      throw new BadRequestException('用户已存在')
    }

    try {
      const res = await this.prismaService.user.create({
        data: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createTime: true,
        },
      })
      return res
    } catch (e) {
      this.logger.error(e, UserService)
      return null
    }
  }

  async login(userLogin: UserLoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: userLogin.username,
      },
    })
    if (!user) {
      throw new BadRequestException('用户不存在')
    }
    if (user.password !== userLogin.password) {
      throw new BadRequestException('密码错误')
    }

    delete user.password
    return {
      user,
      token: this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '7d',
        },
      ),
    }
  }

  async update_password(passwordDto: UserUpdatePasswordDto) {
    const captcha = await this.redisService.get(
      `update_password_captcha_${passwordDto.email}`,
    )
    if (!captcha) {
      throw new BadRequestException('验证码已失效 ')
    }

    if (passwordDto.captcha !== captcha) {
      throw new BadRequestException('验证码不正确')
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        username: passwordDto.username,
      },
    })

    try {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordDto.password,
        },
      })
      return '密码修改成功'
    } catch (e) {
      this.logger.error(e, UserService)
      return '密码修改失败'
    }
  }

  async send_update_password_captcha(address: string) {
    if (!address) {
      throw new BadRequestException('邮箱地址不能为空')
    }
    const code = Math.random().toString().slice(2, 8)
    await this.redisService.set(
      `update_password_captcha_${address}`,
      code,
      10 * 60,
    )
    await this.emailService.sendEmail(
      address,
      '更改密码验证码',
      `<p>你的更改密码验证码是 ${code}</p>`,
    )
  }
}
