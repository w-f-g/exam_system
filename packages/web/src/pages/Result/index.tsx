import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { TQuestion } from '../Edit/QuestionContext'
import { useMeterialConfigStore } from '@/stores/material_config'
import { findAnswer, findExam } from '@/apis'
import { Link, useParams } from 'react-router-dom'

export default function Result() {
  const { id } = useParams()
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<Record<'id' | 'answer', string>[]>([])
  const [data, setData] = useState<TQuestion[]>([])
  const materialConfigs = useMeterialConfigStore((s) => s.configs)

  useEffect(() => {
    load(+id!)
  }, [id])

  const load = async (id: number) => {
    const res = await findAnswer(id)
    setScore(res.score)
    setAnswers(JSON.parse(res.content))
    const exam = await findExam(res.examId)
    if (exam.content === '') {
      exam.content = '[]'
    }
    const _q = JSON.parse(exam.content) as TQuestion[]
    setData(_q)
  }

  return (
    <div className="max-w-[800px] mx-auto my-[30px] p-5 ">
      <div className="mb-5">
        得分：<span className="text-[50px] text-[red] font-bold">{score}</span>
      </div>
      <div className="mb-5">正确答案：</div>
      <div>
        {data.map((x) => {
          const Component = materialConfigs[x.type].component
          const props: Record<string, any> = {
            value: x.answer,
          }
          if (x.type !== 'input') {
            props.options = x.options?.join()
          }
          if (x.type === 'checkbox') {
            props.value = x.answer.split(',')
          }
          const target = answers.find((y) => x.id === +y.id)!
          const answer = Array.isArray(target.answer)
            ? target.answer.join()
            : target.answer
          return (
            <div key={x.id} className="text-xl leading-10">
              <p>{x.question}</p>
              <Component {...props} />
              <p>分值：{x.score}</p>
              <p
                style={{
                  color: answer !== x.answer ? 'red' : '#000',
                }}
              >
                你的答案：
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </p>
              <p className="text-[green]">答案解析：{x.answerAnalyse}</p>
            </div>
          )
        })}
      </div>
      <Button type="primary" className="w-full h-10 mt-5">
        <Link to="/">返回试卷列表页</Link>
      </Button>
    </div>
  )
}
