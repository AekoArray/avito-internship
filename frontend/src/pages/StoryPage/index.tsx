import React, { FC, useEffect } from 'react'
import { Card, Space } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import IconText from '../../components/IconText'
import { Link, useParams } from 'react-router-dom'
import useTypedSelector from '../../utils/hooks/useTypedSelector'
import useAppDispatch from '../../utils/hooks/useAppDispatch'
import { getStory } from '../../store/actions'
import './index.css'
import { CommentsTree } from '../../components/CommentsTree'
import { formatDate } from '../../utils/formatDate'
import { BackButton } from '../../components/BackButton'

const StoryPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const loading = useTypedSelector((state) => state.loading)
  const story = useTypedSelector((state) => state.currentStory)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStory(id))
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ marginTop: 20 }}>
        <BackButton />
        <Card
          title={story?.title}
          extra={<span className='by'>{story?.by}</span>}
          loading={loading}
        >
          <div>
            Link: <Link to={story?.url || ''}>{story?.url}</Link>
          </div>
          <div>Date: {formatDate(story?.time || 0)}</div>
          <div>
            {story?.descendants ? (
              <Space>
                <IconText icon={CommentOutlined} text={`Comments: ${story?.descendants}`} />
              </Space>
            ) : null}
          </div>
        </Card>

        <CommentsTree />
      </Space>
    </>
  )
}

export default StoryPage
