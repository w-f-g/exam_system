import { materialTypes, useMeterialConfigStore } from '@/stores/material_config'
import { useContext } from 'react'
import { useDrop } from 'react-dnd'
import { QuestionContext, TQuestion, TQuestionType } from '../QuestionContext'

export default function EditArea() {
  const { state, add, curQuestionId, setCurQuestionId } =
    useContext(QuestionContext)
  const materialConfigs = useMeterialConfigStore((s) => s.configs)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: materialTypes,
      drop: (item: Record<'type', TQuestionType>) => {
        const question: TQuestion = {
          id: Date.now(),
          type: item.type,
          question: '题目',
          score: 5,
          answer: '选项1',
          answerAnalyse: '答案解析',
        }
        if (item.type !== 'input') {
          question.options = ['选项1', '选项2']
        }
        add(question)
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        }
      },
    }
  })

  return (
    <div
      ref={drop}
      className="h-full flex-1 overflow-y-auto"
      style={{
        border: isOver ? '2px solid blue' : 'none',
      }}
    >
      {state.map((x) => {
        const Component = materialConfigs[x.type].component
        const props: Record<string, any> = {}
        if (x.type !== 'input') {
          props.options = x.options?.join()
        }
        return (
          <div
            key={x.id}
            onClick={() => setCurQuestionId(x.id)}
            className="m-5 text-xl select-none leading-10 border-b border-b-black"
            style={
              curQuestionId === x.id
                ? {
                    border: '1px solid blue',
                  }
                : {}
            }
          >
            <p>{x.question}</p>
            <div>
              <Component {...props} />
            </div>
            <p>分值：{x.score}</p>
            <p>答案：{x.answer}</p>
            <p>答案解析：{x.answerAnalyse}</p>
          </div>
        )
      })}
    </div>
  )
}
