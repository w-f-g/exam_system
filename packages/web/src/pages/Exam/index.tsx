import { Button, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { TQuestion } from '../Edit/QuestionContext'
import { useMeterialConfigStore } from '@/stores/material_config'
import { addAnswer, findExam } from '@/apis'
import { useNavigate, useParams } from 'react-router-dom'

export default function Exam() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [data, setData] = useState<TQuestion[]>([])
  const navigate = useNavigate()
  const materialConfigs = useMeterialConfigStore((s) => s.configs)

  useEffect(() => {
    load(+id!)
  }, [id])

  const load = async (id: number) => {
    const res = await findExam(id)
    if (res.content === '') {
      res.content = '[]'
    }
    const _q = JSON.parse(res.content) as TQuestion[]
    setData(_q)
  }

  const handleFinish = async () => {
    const values: Record<number, string | string[]> = form.getFieldsValue()
    const answers = Object.entries(values).map(([k, v]) => {
      return {
        id: Number(k),
        answer: v !== undefined ? v : '',
      }
    })
    const res = await addAnswer({
      examId: +id!,
      content: JSON.stringify(answers),
    })
    if (res.status === 200 || res.status === 201) {
      message.success('提交成功')
      navigate(`/res/${res.data.id}`)
      // console.log(values)
    }
  }

  return (
    <div className="max-w-[800px] mx-auto my-[30px] p-5 ">
      <Form form={form}>
        {data.map((x) => {
          const Component = materialConfigs[x.type].component
          const props: Record<string, any> = {}
          if (x.type !== 'input') {
            props.options = x.options?.join()
          }
          return (
            <div key={x.id} className="text-xl leading-10">
              <p>{x.question}</p>
              <Form.Item name={x.id}>
                <Component {...props} />
              </Form.Item>
            </div>
          )
        })}
      </Form>
      <Button type="primary" onClick={handleFinish} className="w-full h-10">
        提交
      </Button>
    </div>
  )
}
