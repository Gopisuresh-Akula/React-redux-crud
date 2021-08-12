import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Feature from './Components/Features/Features.js';
import ProjectsList from './Components/ProjectsList/ProjectsList';
import './common.scss'
const App = () => {
  return (
    <div> 
      <Router>
      <Switch>
    <Route path="/" exact component={ProjectsList} />
    <Route path="/project-fetures/:pathparam?" exact component={Feature} />

    </Switch>
</Router>
     
    </div>
  )
}

export default App
