import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useReducer,
  useState,
} from 'react'

export type TQuestionType = 'radio' | 'checkbox' | 'input'

export type TQuestion = {
  id: number
  question: string
  type: TQuestionType
  options?: string[]
  score: number
  answer: string
  answerAnalyse: string
}

export type TQuestionContext = {
  state: TQuestion[]
  curQuestionId: number | null
  setCurQuestionId: Dispatch<SetStateAction<number | null>>
  add: (data: TQuestion) => void
  load: (data: TQuestion[]) => void
  delete: (id: number) => void
  update: (data: TQuestion) => void
}

export const QuestionContext = createContext({} as TQuestionContext)

type TQuestionAction =
  | { type: 'add'; data: TQuestion }
  | { type: 'update'; data: TQuestion }
  | { type: 'delete'; id: number }
  | { type: 'load'; data: TQuestion[] }

const reducer = (state: TQuestion[], action: TQuestionAction) => {
  switch (action.type) {
    case 'add': {
      return [...state, action.data]
    }
    case 'delete': {
      return state.filter((x) => x.id !== action.id)
    }
    case 'update': {
      const index = state.findIndex((x) => x.id === action.data.id)
      if (index >= 0) {
        state[index] = action.data
      }
      return [...state]
    }
    case 'load': {
      return [...action.data]
    }
    default: {
      return state
    }
  }
}

export const QuestionProvider = ({ children }: PropsWithChildren) => {
  const [curQuestionId, setCurQuestionId] = useState<number | null>(null)
  const [state, dispatch] = useReducer(reducer, [] as TQuestion[])

  const add = (data: TQuestion) => {
    dispatch({
      type: 'add',
      data,
    })
  }

  const deleteQuesttion = (id: number) => {
    dispatch({
      type: 'delete',
      id,
    })
  }

  const update = (data: TQuestion) => {
    dispatch({
      type: 'update',
      data,
    })
  }

  const load = (data: TQuestion[]) => {
    dispatch({
      type: 'load',
      data,
    })
  }

  return (
    <QuestionContext.Provider
      value={{
        state,
        curQuestionId,
        add,
        load,
        update,
        delete: deleteQuesttion,
        setCurQuestionId,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}
