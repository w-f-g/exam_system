export interface IUser {
  id: number
  username: string
  password: string
  email: string
  createTime: string | Date
  updateTime: string | Date
}

export interface IUserRegisterDto
  extends Omit<IUser, 'id' | 'createTime' | 'updateTime'> {
  captcha: string
}

export interface IUserLoginDto extends Pick<IUser, 'username' | 'password'> {}

export interface IUserLoginVo {
  user: Omit<IUser, 'password'>
  token: string
}

export interface IUserUpdatePasswordDto extends IUserRegisterDto {}
