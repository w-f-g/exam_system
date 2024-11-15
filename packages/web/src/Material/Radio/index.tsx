import { Radio as AntdRadio, RadioProps } from 'antd'

type Props = {
  options: string
  onChange: RadioProps['onChange']
}

export default function Radio({ options, onChange }: Props) {
  const _options = options.split(',').filter(Boolean)
  return (
    <div>
      <AntdRadio.Group onChange={onChange}>
        {_options.map((o, i) => {
          return (
            <AntdRadio key={o + i} value={o}>
              {o}
            </AntdRadio>
          )
        })}
      </AntdRadio.Group>
    </div>
  )
}
