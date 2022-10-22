import React, { FC } from 'react'
import { List } from 'antd'
import { CalendarOutlined, RiseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { NewsItem } from '../../types'
import IconText from '../IconText'

interface NewsListProps {
  data: NewsItem[]
}

const NewsList: FC<NewsListProps> = ({ data }) => {
  return (
    <>
      <List
        itemLayout='vertical'
        dataSource={data}
        size='small'
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={RiseOutlined} text={item.rating} key='list-rating' />,
              <IconText icon={CalendarOutlined} text={item.date} key='list-date' />,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/news/${item.id}`}>{item.name}</Link>}
              description={item.author}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default NewsList
