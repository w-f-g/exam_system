import { Input as AntdInput, InputProps } from 'antd'

type Props = {
  onChange: InputProps['onChange']
}

export default function Input({ onChange }: Props) {
  return (
    <div>
      <AntdInput onChange={onChange} />
    </div>
  )
}
