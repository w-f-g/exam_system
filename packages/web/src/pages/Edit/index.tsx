import { Button } from 'antd'
import EditArea from './views/EditArea'
import Material from './views/Material'
import { QuestionProvider } from './QuestionContext'
import Settings from './views/Settings'

export default function Edit() {
  return (
    <div id="edit-container">
      <div className="flex justify-between items-center h-20 border-b border-b-black px-5">
        <h1 className="text-3xl">试卷编辑器</h1>
        <Button type="primary">预览</Button>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        <QuestionProvider>
          <Material />
          <EditArea />
          <Settings />
        </QuestionProvider>
      </div>
    </div>
  )
}
