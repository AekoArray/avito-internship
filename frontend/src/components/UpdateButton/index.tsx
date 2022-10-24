import React, { FC } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface UpdateButtonProps {
  onClick: () => void
  loading?: boolean
}

const UpdateButton: FC<UpdateButtonProps> = ({ onClick, loading }) => {
  return (
    <Button
      type='primary'
      shape='round'
      icon={<SyncOutlined />}
      onClick={onClick}
      size='middle'
      loading={loading}
    >
      Update
    </Button>
  )
}

export default UpdateButton
