import { Checkbox as AntdCheckbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'

type Props = {
  options: string
  onChange: CheckboxGroupProps['onChange']
}

export default function Checkbox({ options, onChange }: Props) {
  return (
    <div>
      <AntdCheckbox.Group
        options={options.split(',').filter(Boolean)}
        onChange={onChange}
      />
    </div>
  )
}
