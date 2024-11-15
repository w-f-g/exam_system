import { Modal } from 'antd'
import { TQuestion } from '../QuestionContext'
import { useMeterialConfigStore } from '@/stores/material_config'

type Props = {
  isOpen: boolean
  handleClose: () => void
  data: TQuestion[]
}

export default function PreviewModal({ isOpen, data, handleClose }: Props) {
  const materialConfigs = useMeterialConfigStore((s) => s.configs)
  return (
    <Modal
      title="预览"
      className="preview"
      open={isOpen}
      onOk={handleClose}
      onCancel={handleClose}
      okText="确认"
      cancelText="取消"
    >
      <div>
        {data.map((x) => {
          const Component = materialConfigs[x.type].component
          const props: Record<string, any> = {}
          if (x.type !== 'input') {
            props.options = x.options?.join()
          }

          return (
            <div key={x.id} className="m-5 text-xl select-none leading-10">
              <p>{x.question}</p>
              <div>
                <Component {...props} />
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
