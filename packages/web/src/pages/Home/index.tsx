import {
  deleteExam,
  exportExam as exportAnswer,
  getExamList,
  publishExam,
  recoverExam,
  unpublishExam,
} from '@/apis'
import { IExamListVo } from '@exam_system/types'
import { Button, message, Popconfirm, Popover } from 'antd'
import { useEffect, useState } from 'react'
import ExamAddModal from './ExamAddModal'
import { CopyOutlined, PoweroffOutlined } from '@ant-design/icons'
import { logout } from '@/stores/user'
import { Link, useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import RankingModal from './RankingModal'
import Loading from '@/components/Loading'

export default function Home() {
  const [bin, setBin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [examList, setExamList] = useState<IExamListVo[]>([])
  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false)

  const [curExamId, setCurExamId] = useState<number | null>(null)
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setLoading(true)
    const res = await getExamList()
    if (res) {
      setExamList(res)
    }
    setLoading(false)
  }

  const handleDeleteExam = async (id: number) => {
    const res = await deleteExam(id)
    if (res.status === 200 || res.status === 201) {
      message.success('删除成功')
      load()
    }
  }

  const handleRecoverExam = async (id: number) => {
    const res = await recoverExam(id)
    if (res.status === 200 || res.status === 201) {
      message.success('恢复成功')
      load()
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return !loading ? (
    <div>
      <div className="h-20 px-5 flex justify-between items-center border-b border-b-[#aaa]">
        <h1>考试系统</h1>
        <Button
          shape="circle"
          title="退出登录"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        />
      </div>
      <div className="p-5">
        <div className="mb-5">
          <Button type="primary" onClick={() => setIsAddExamModalOpen(true)}>
            新建试卷
          </Button>
          <Button className="ml-3" onClick={() => setBin(!bin)}>
            {bin ? '退出回收站' : '打开回收站'}
          </Button>
        </div>
        <div>
          {examList
            .filter((x) => (bin ? x.isDelete === true : x.isDelete === false))
            .map((x) => {
              const examUrl = window.location.origin + '/exam/' + x.id
              return (
                <div
                  key={x.id}
                  className="min-h-[100px] border border-black p-5 mb-5"
                >
                  <p>{x.name}</p>
                  {!bin ? (
                    <div>
                      <Button
                        onClick={async () => {
                          if (x.isPublish) {
                            await unpublishExam(x.id)
                          } else {
                            await publishExam(x.id)
                          }
                          load()
                        }}
                        className="m-[10px] bg-[darkblue]"
                        type="primary"
                      >
                        {x.isPublish ? '停止' : '发布'}
                      </Button>
                      <Button type="primary" className="m-[10px] bg-[green]">
                        <Link to={`/edit/${x.id}`}>编辑</Link>
                      </Button>
                      <Popover
                        trigger="click"
                        content={
                          <div className="flex">
                            <span>{examUrl}</span>
                            <CopyOutlined
                              title="复制链接"
                              className="ml-1 cursor-pointer"
                              onClick={() => copy(examUrl)}
                            />
                          </div>
                        }
                      >
                        <Button>考试链接</Button>
                      </Popover>
                      <Button
                        className="m-[10px] bg-[orange]"
                        type="primary"
                        onClick={() => {
                          setIsRankingModalOpen(true)
                          setCurExamId(x.id)
                        }}
                      >
                        排行榜
                      </Button>
                      <Button onClick={() => exportAnswer(x.id)}>
                        导出所有答卷
                      </Button>
                      <Popconfirm
                        title="试卷删除"
                        description="确认放入回收站吗？"
                        onConfirm={() => handleDeleteExam(x.id)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button
                          className="m-[10px] bg-[darkred]"
                          type="primary"
                        >
                          删除
                        </Button>
                      </Popconfirm>
                    </div>
                  ) : (
                    <div>
                      <Button
                        className="m-[10px] bg-[green]"
                        type="primary"
                        onClick={() => handleRecoverExam(x.id)}
                      >
                        恢复
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
      <ExamAddModal
        isOpen={isAddExamModalOpen}
        handleClose={() => {
          setIsAddExamModalOpen(false)
          load()
        }}
      />
      <RankingModal
        examId={curExamId}
        isOpen={isRankingModalOpen}
        handleClose={() => {
          setIsRankingModalOpen(false)
          setCurExamId(null)
        }}
      />
    </div>
  ) : (
    <Loading />
  )
}
