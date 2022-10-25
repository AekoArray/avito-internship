import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import StoryPage from './pages/StoryPage'
import './App.css'
import { Routes } from './utils/routes'

function App() {
  return (
    <div className='pageContainer'>
      <Router>
        <Switch>
          <Route path={Routes.STORY} component={StoryPage} />
          <Route exact path={Routes.MAIN} component={MainPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
