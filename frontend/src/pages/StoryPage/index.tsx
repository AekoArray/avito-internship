import React, { FC, useEffect, useMemo } from 'react'
import { Avatar, Card, Comment, Space, Spin, Tree, TreeNodeProps } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import IconText from '../../components/IconText'
import { Link, useParams } from 'react-router-dom'
import useTypedSelector from '../../utils/hooks/useTypedSelector'
import useAppDispatch from '../../utils/hooks/useAppDispatch'
import { getComment, getStory, updateComments } from '../../store/actions'
import './index.css'
import { CommentDisplayed } from '../../types'
import UpdateButton from '../../components/UpdateButton'
import { CommentsTree } from '../../components/CommentsTree'

const StoryPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const loading = useTypedSelector((state) => state.loading)
  const story = useTypedSelector((state) => state.currentStory)

  console.log(loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStory(id))
  }, [])

  return (
    <>
      <Card title={story?.title} extra={<span className='by'>{story?.by}</span>} loading={loading}>
        <div>
          Link: <Link to={story?.url || ''}>{story?.url}</Link>
        </div>
        <div>Date: {new Date(story?.time ? story?.time * 1000 : 0).toLocaleString()}</div>
      </Card>
      <br />
      <Space>
        <IconText icon={CommentOutlined} text={`Comments: ${story?.descendants}`} />
      </Space>
      <CommentsTree />
    </>
  )
}

export default StoryPage
