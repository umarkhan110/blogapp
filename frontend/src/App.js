import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './component/Login.js';
import Blog from './component/Blog';
import Menu from './component/Menu.js';
import Home from './component/Home.js';
import Signup from './component/Signup.js';
import Logout from './component/Logout.js';
import Editblg from './component/Editblg.js';

function App() {

  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/editblg/:id" component={Editblg} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
