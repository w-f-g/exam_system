import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { register, sendRegisterCaptcha } from '@/apis'
import { useForm } from 'antd/es/form/Form'
import { IUserRegisterDto } from '@exam_system/types'
import useCountDown, { COUNT_DOWN } from '@/hooks/useCountDown'

const layout01 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const layout02 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}

export default function Login() {
  const [form] = useForm()
  const navigate = useNavigate()
  const { captchaState, updateCountDown } = useCountDown()

  const sendCaptcha = async () => {
    const address = form.getFieldValue('email')
    if (!address) {
      message.error('请输入邮箱地址')
      return
    }

    updateCountDown(COUNT_DOWN)
    const res = await sendRegisterCaptcha(address)
    if (res.status === 200 || res.status === 201) {
      message.success('发送成功')
    }
  }

  const onFinish = async (
    value: IUserRegisterDto & Record<'confirmPassword', string>,
  ) => {
    const res = await register(value)
    if (res.status === 200 || res.status === 201) {
      message.success('注册成功')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }
  }

  return (
    <div
      id="register-container"
      className="w-[400px] mt-[100px] mx-auto mb-0 text-center"
    >
      <h1 className="text-2xl font-bold mb-10">考试系统</h1>
      <Form
        form={form}
        onFinish={onFinish}
        colon={false}
        autoComplete="off"
        {...layout01}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码不能少于 6 位' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              validator(rule, value: string, callback) {
                if (!value) {
                  return callback('请输入确认密码')
                }
                if (value?.length < 6) {
                  return callback('密码不能少于 6 位')
                }
                const pwd = form.getFieldValue('password')
                if (value !== pwd) {
                  return callback('两次输入密码不一致')
                }
                callback()
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入合法邮箱地址' },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex justify-end">
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input />
          </Form.Item>
          <Button
            disabled={captchaState.state === 'PENDING'}
            className="ml-2"
            type="primary"
            onClick={sendCaptcha}
          >
            {captchaState.state === 'FINISH'
              ? '发送验证码'
              : captchaState.countDown + '秒后重新发送'}
          </Button>
        </div>
        <Form.Item {...layout02}>
          <div className="flex justify-end">
            已有账号？去<Link to="/login">登录</Link>
          </div>
        </Form.Item>
        <Form.Item {...layout02}>
          <Button className="w-full" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
