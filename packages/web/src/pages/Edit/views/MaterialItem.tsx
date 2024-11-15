import { useDrag } from 'react-dnd'

type Props = {
  name: string
  type: string
}

export default function MaterialItem({ name, type }: Props) {
  const [_, drag] = useDrag({
    type,
    item: {
      type,
    },
  })
  return (
    <div
      ref={drag}
      className="materials-item p-5 border border-black inline-block m-[10px] cursor-move"
    >
      {name}
    </div>
  )
}
