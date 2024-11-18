import { Input as AntdInput } from 'antd'

type Props = {
  value?: string
}

export default function Input(props: Props) {
  return (
    <div>
      <AntdInput {...props} />
    </div>
  )
}
