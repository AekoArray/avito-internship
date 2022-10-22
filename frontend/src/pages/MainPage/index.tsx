import React, { FC, useState } from 'react'
import { Typography } from 'antd'
import UpdateButton from '../../components/UpdateButton'
import NewsList from '../../components/NewsList'

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

const MainPage: FC = () => {
  const [isSpin, setSpin] = useState(false)

  return (
    <>
      <Title>Hacker News</Title>
      <UpdateButton isSpin={isSpin} onClick={() => setSpin(!isSpin)} />
      <NewsList data={mockData} />
    </>
  )
}

export default MainPage
