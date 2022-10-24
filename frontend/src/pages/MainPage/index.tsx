import React, { FC, useCallback, useEffect } from 'react'
import { Typography } from 'antd'
import UpdateButton from '../../components/UpdateButton'
import StoriesList from '../../components/StoriesList'
import useTypedSelector from '../../utils/hooks/useTypedSelector'
import { getStories } from '../../store/actions'
import useAppDispatch from '../../utils/hooks/useAppDispatch'
import './index.css'

const { Title } = Typography

const MainPage: FC = () => {
  const stories = useTypedSelector((state) => state.stories)
  const loading = useTypedSelector((state) => state.loading)

  const dispatch = useAppDispatch()

  const updateStories = useCallback(() => {
    dispatch(getStories())
  }, [])

  useEffect(() => {
    updateStories()
  }, [])

  useEffect(() => {
    const interval = setInterval(updateStories, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Title>Hacker News</Title>
      <UpdateButton onClick={updateStories} title='Update stories' />
      <StoriesList data={stories} loading={loading} />
    </>
  )
}

export default MainPage
