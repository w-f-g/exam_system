import { ranking } from '@/apis'
import { IAnswer } from '@exam_system/types'
import { Modal, Table, TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  handleClose: () => void
  examId: number | null
}

const columns: TableColumnsType<IAnswer> = [
  {
    title: '名字',
    key: 'name',
    render: (_, record) => {
      return <div>{record.answerer?.username}</div>
    },
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
  },
]

export default function RankingModal({ isOpen, examId, handleClose }: Props) {
  const [list, setList] = useState<IAnswer[]>([])

  useEffect(() => {
    if (examId) {
      load(examId)
    }
  }, [examId])

  const load = async (id: number) => {
    const res = await ranking(id)
    setList(res)
  }

  return (
    <Modal
      okText="确认"
      title="排行榜"
      cancelText="取消"
      open={isOpen}
      onOk={handleClose}
      onCancel={handleClose}
    >
      <Table columns={columns} dataSource={list} />
    </Modal>
  )
}
