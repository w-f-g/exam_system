import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { IUserLoginDto } from '@exam_system/types'
import { login } from '@/apis'

const layout01 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const layout02 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}

export default function Login() {
  const onFinish = async (value: IUserLoginDto) => {
    const res = await login(value)
    console.log(res)
  }

  return (
    <div
      id="login-container"
      className="w-[400px] mt-[100px] mx-auto mb-0 text-center"
    >
      <h1 className="text-2xl font-bold mb-10">考试系统</h1>
      <Form
        onFinish={onFinish}
        colon={false}
        requiredMark={false}
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
        <Form.Item {...layout02}>
          <div className="flex justify-between">
            <Link to="/register">注册账号</Link>
            <Link to="/update_password">忘记密码</Link>
          </div>
        </Form.Item>
        <Form.Item {...layout02}>
          <Button className="w-full" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
