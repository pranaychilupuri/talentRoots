import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import SignUpForm from './components/SignUp'
import SignInForm from './components/SignIn'
import AddLeavePolicy from './components/AddLeavePolicy'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignUpForm} />
      <Route exact path="/signin" component={SignInForm} />
      <Route path="/:emailId" component={Home} />
      <Route exact path="/add" component={AddLeavePolicy} />
    </Switch>
  </BrowserRouter>
)

export default App
