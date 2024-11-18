import { Link, useParams } from 'react-router-dom'
import { Button, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { findExam, saveExam } from '@/apis'
import { QuestionContext, TQuestion } from './QuestionContext'
import EditArea from './views/EditArea'
import Material from './views/Material'
import Settings from './views/Settings'
import PreviewModal from './views/PreviewModal'

export default function Edit() {
  const { id } = useParams()
  const { state, load } = useContext(QuestionContext)
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)

  useEffect(() => {
    onLoad(+id!)

    const save = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        handleSaveExam()
      }
    }
    window.addEventListener('keydown', save)
    return () => {
      window.removeEventListener('keydown', save)
    }
  }, [id])

  const onLoad = async (id: number) => {
    const res = await findExam(id)
    if (res.content === '') {
      res.content = '[]'
    }
    const _q = JSON.parse(res.content) as TQuestion[]
    load(_q)
  }

  const handleSaveExam = async () => {
    const res = await saveExam(+id!, state)
    if (res.status === 200 || res.status === 201) {
      message.success('保存成功')
    }
  }
  return (
    <div id="edit-container">
      <div className="flex justify-between items-center h-20 border-b border-b-black px-5">
        <h1 className="text-3xl">试卷编辑器</h1>
        <div className="flex gap-2">
          <Button onClick={() => setPreviewModalOpen(true)}>预览</Button>
          <Button type="primary" onClick={handleSaveExam}>
            保存
          </Button>
          <Button>
            <Link to="/">返回</Link>
          </Button>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        <Material />
        <EditArea />
        <Settings />
      </div>
      <PreviewModal
        data={state}
        isOpen={isPreviewModalOpen}
        handleClose={() => setPreviewModalOpen(false)}
      />
    </div>
  )
}
