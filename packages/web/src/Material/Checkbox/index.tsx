import { Checkbox as AntdCheckbox } from 'antd'

type Props = {
  options: string
}

export default function Checkbox({ options, ...props }: Props) {
  return (
    <div>
      <AntdCheckbox.Group
        options={options.split(',').filter(Boolean)}
        {...props}
      />
    </div>
  )
}
