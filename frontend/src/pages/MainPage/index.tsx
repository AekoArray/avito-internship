import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiseOutlined, CalendarOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, List, Space, Typography } from 'antd'

const { Title } = Typography

const mockData = [
  {
    id: 0,
    name: 'name',
    rating: '10200',
    author: 'author',
    date: '21/03/2022',
  },
  {
    id: 1,
    name: 'name',
    rating: '10200',
    author: 'author',
    date: '21/03/2022',
  },
  {
    id: 2,
    name: 'name',
    rating: '10200',
    author: 'author',
    date: '21/03/2022',
  },
]

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const MainPage: FC = () => {
  const [isSpin, setSpin] = useState(false)

  return (
    <div className='pageContainer'>
      <Title>Hacker News</Title>
      <Button
        type='primary'
        shape='circle'
        icon={<SyncOutlined spin={isSpin} onClick={() => setSpin(!isSpin)} />}
        size='middle'
      />
      <List
        itemLayout='horizontal'
        dataSource={mockData}
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
    </div>
  )
}

export default MainPage
