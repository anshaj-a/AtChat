import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

const App: React.FC = () => {
  // If the user is somehow logged in, I should know:
  const userLogin = useSelector((state: any) => state.userLogin);
  const userRegister = useSelector((state: any) => state.userRegister);

  let user = '';

  if (userLogin.userInfo) {
    const { userInfo } = userLogin;
    user = userInfo;
  } else {
    const { userInfo } = userRegister;
    user = userInfo;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* Login Page */}
        <Route exact path='/login'>
          <LoginPage />
        </Route>

        {/* Register Page */}
        <Route exact path='/register'>
          <RegisterPage />
        </Route>

        {/* Home Page */}
        <Route exact path='/'>
          {user ? <HomePage /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
