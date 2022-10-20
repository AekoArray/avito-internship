import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NewsPage from './pages/NewsPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/news/:id' component={NewsPage} />
        <Route exact path='/' component={MainPage} />
      </Switch>
    </Router>
  )
}

export default App
