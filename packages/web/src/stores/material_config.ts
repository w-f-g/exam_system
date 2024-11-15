import { TQuestionType } from '@/pages/Edit/QuestionContext'
import { ComponentType } from 'react'
import { create } from 'zustand'

type TMaterialConfig = {
  name: string
  type: 'input' | 'radio' | 'checkbox'
  sort: number
  component: ComponentType
  props: Record<string, any>
}

const configModules: Record<string, TMaterialConfig> = import.meta.glob(
  '../Material/**/config.tsx',
  {
    import: 'default',
    eager: true,
  },
)

const configs = Object.values(configModules).reduce(
  (prev, config) => {
    prev[config.type] = config
    return prev
  },
  {} as Record<TQuestionType, TMaterialConfig>,
)

export const materialTypes = Object.keys(configs)

const state = {
  configs,
}

export const useMeterialConfigStore = create(() => state)
