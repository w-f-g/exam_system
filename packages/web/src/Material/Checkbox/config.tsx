import Checkbox from '.'

const config = {
  name: '多选题',
  type: 'checkbox',
  sort: 1,
  component: Checkbox,
  props: {
    options: '',
    onChange: () => {},
  },
}

export default config
