import { IUserLoginDto, IUserRegisterDto } from '@exam_system/types'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class UserRegisterDto implements IUserRegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于 6 位' })
  password: string

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '不是合法的邮箱格式' })
  email: string

  @IsNotEmpty({ message: '验证码不能为空' })
  captcha: string
}

export class UserLoginDto implements IUserLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}

export class UserUpdatePasswordDto extends UserRegisterDto {}
