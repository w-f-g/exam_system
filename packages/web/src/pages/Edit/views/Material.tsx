import { useMemo } from 'react'
import { useMeterialConfigStore } from '@/stores/material_config'
import MaterialItem from './MaterialItem'

export default function Material() {
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

  return (
    <div className="materials h-full w-[300px] border-r border-r-black">
      {materials.map((x) => {
        return <MaterialItem key={x.type} {...x} />
      })}
    </div>
  )
}
