import { MouseEvent } from 'react'
import { addExam } from '@/apis'
import { IExamAddDto } from '@exam_system/types'
import { Form, Input, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'

type Props = {
  isOpen: boolean
  handleClose: (e?: MouseEvent<HTMLButtonElement>) => void
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export default function ExamAddModal({ isOpen, handleClose }: Props) {
  const [form] = useForm()

  const handleOk = async () => {
    await form.validateFields()

    const values: IExamAddDto = form.getFieldsValue()
    const res = await addExam(values)
    console.log(res)
    message.success('创建成功')
    form.resetFields()
    handleClose()
  }
  return (
    <Modal
      title="新增试卷"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleClose}
      okText="创建"
      cancelText="取消"
    >
      <Form form={form} colon={false} {...layout}>
        <Form.Item
          label="试卷名"
          name="name"
          rules={[{ required: true, message: '请输入试卷名' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
