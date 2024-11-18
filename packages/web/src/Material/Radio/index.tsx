import { Radio as AntdRadio } from 'antd'

type Props = {
  options: string
}

export default function Radio({ options, ...props }: Props) {
  const _options = options.split(',').filter(Boolean)

  return (
    <div>
      <AntdRadio.Group {...props}>
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
