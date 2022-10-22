import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NewsPage from './pages/NewsPage'
import './App.css'

function App() {
  return (
    <div className='pageContainer'>
      <Router>
        <Switch>
          <Route path='/news/:id' component={NewsPage} />
          <Route exact path='/' component={MainPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
