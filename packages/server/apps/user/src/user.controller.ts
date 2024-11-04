import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import {
  UserLoginDto,
  UserRegisterDto,
  UserUpdatePasswordDto,
} from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('register_captcha')
  async captcha(@Query('address') address: string) {
    await this.userService.send_captcha(address)
    return '发送成功'
  }

  @Post('register')
  async register(@Body() registerUser: UserRegisterDto) {
    const res = await this.userService.create(registerUser)
    return res
  }

  @Post('login')
  async userLogin(@Body() loginUser: UserLoginDto) {
    const res = await this.userService.login(loginUser)
    return res
  }

  @Post('update_password')
  async updatePassword(@Body() passwordDto: UserUpdatePasswordDto) {
    const res = await this.userService.update_password(passwordDto)
    return res
  }

  @Get('update_password/captcha')
  async updatePasswordCaptcha(@Query('address') address: string) {
    await this.userService.send_update_password_captcha(address)
    return '发送成功'
  }
}
