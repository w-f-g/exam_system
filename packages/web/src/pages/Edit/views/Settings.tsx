import { useContext, useEffect, useMemo, useState } from 'react'
import { QuestionContext, TQuestion } from '../QuestionContext'
import { Form, Input, InputNumber, Radio, Segmented } from 'antd'
import { useMeterialConfigStore } from '@/stores/material_config'

const TextArea = Input.TextArea

const KEY_OPTIONS = ['json', '属性']

export default function Settings() {
  const [form] = Form.useForm()
  const [key, setKey] = useState(KEY_OPTIONS[1])
  const { state, curQuestionId, update } = useContext(QuestionContext)
  const configs = useMeterialConfigStore((s) => s.configs)

  const materials = useMemo(() => {
    const values = Object.values(configs)
    values.sort((a, b) => a.sort - b.sort)
    return values.map((x) => {
      return {
        name: x.name,
        type: x.type,
      }
    })
  }, [configs])

  const question = useMemo(() => {
    if (curQuestionId) {
      return state.find((x) => x.id === curQuestionId)!
    }
    return null
  }, [state, curQuestionId])

  useEffect(() => {
    form.setFieldsValue({
      ...question,
    })
  }, [form, question])

  return (
    <div className="w-[400px] h-full border-l border-l-black">
      <Segmented block key={key} onChange={setKey} options={KEY_OPTIONS} />
      {key === KEY_OPTIONS[0] && <pre>{JSON.stringify(state, null, 4)}</pre>}
      {key === KEY_OPTIONS[1] && question && (
        <div>
          <Form
            form={form}
            className="p-5"
            initialValues={question}
            onValuesChange={(_, values: Omit<TQuestion, 'id'>) => {
              update({
                id: curQuestionId!,
                ...values,
                options: values.options?.toString().split(','),
              })
            }}
          >
            <Form.Item
              label="问题"
              name="question"
              rules={[{ required: true, message: '请输入问题' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="类型"
              name="type"
              rules={[{ required: true, message: '请选择类型' }]}
            >
              <Radio.Group>
                {materials.map((x) => {
                  return (
                    <Radio key={x.type} value={x.type}>
                      {x.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
            {question.type !== 'input' && (
              <Form.Item
                label="选项（逗号分割）"
                name="options"
                rules={[{ required: true, message: '请输入选项' }]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item
              label="分数"
              name="score"
              rules={[{ required: true, message: '请输入分数' }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="答案"
              name="answer"
              rules={[{ required: true, message: '请输入答案' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="答案分析"
              name="answerAnalyse"
              rules={[{ required: true, message: '请输入答案分析' }]}
            >
              <TextArea />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}
