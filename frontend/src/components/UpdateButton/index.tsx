import React, { FC } from 'react'
import { SyncOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface UpdateButtonProps {
  isSpin: boolean
  onClick: () => void
}

const UpdateButton: FC<UpdateButtonProps> = ({ isSpin, onClick }) => {
  return (
    <Button
      type='primary'
      shape='round'
      icon={<SyncOutlined spin={isSpin} />}
      onClick={onClick}
      size='middle'
    >
      Update
    </Button>
  )
}

export default UpdateButton
