import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import StoryPage from './pages/StoryPage'
import './App.css'

function App() {
  return (
    <div className='pageContainer'>
      <Router>
        <Switch>
          <Route path='/story/:id' component={StoryPage} />
          <Route exact path='/' component={MainPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
