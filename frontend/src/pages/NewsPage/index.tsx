import React, { FC } from 'react'
import { Descriptions } from 'antd'
import { CommentOutlined } from '@ant-design/icons'
import IconText from '../../components/IconText'

const NewsPage: FC = () => {
  return (
    <>
      <Descriptions title='заголовок новости' layout='vertical' bordered>
        <Descriptions.Item label='Author'>Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label='Date'>13/04/2022</Descriptions.Item>
        <Descriptions.Item label='Link'>http://lkdsds.com</Descriptions.Item>
      </Descriptions>
      <br />
      <IconText icon={CommentOutlined} text='Comments: 3' />
    </>
  )
}

export default NewsPage
