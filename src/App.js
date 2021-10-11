import React from 'react'
import './App.css';
import Registration from "./components/Registration/Registration";
import HomePage from "./components/HomePage/HomePage";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import EditTask from "./components/EditTask/EditTask";
import DeleteTask from "./components/DeleteTask/DeleteTask";
import { createBrowserHistory } from 'history'
import { obtainNewTokens } from './components/api'

const history = createBrowserHistory();

function App() {
  return (
      <BrowserRouter history={history}>
          <HomePage></HomePage>
          <div className="App">
              <Switch>
                  <Route
                    path='/' exact
                    render={({ location }) =>
                      <Redirect
                        to={{
                          pathname: '/home',
                          state: { from: location }
                        }}
                      />
                    }
                  />
                  <LoginRoute path = "/api/signup"><Registration /></LoginRoute>
                  <ProtectedRoute path = "/home"><HomePage /></ProtectedRoute>
                  <ProtectedRoute path = "/home/edit"><EditTask /></ProtectedRoute>
                  <ProtectedRoute path = "/home/delete"><DeleteTask /></ProtectedRoute>
              </Switch>
          </div>
      </BrowserRouter>
  );
}

function ProtectedRoute(props) {
  return (
    <ConditionalRoute redirect='/api/signup/login' mustBeLoggedIn={true} {...props} />
  )
}

function LoginRoute(props) {
  return (
    <ConditionalRoute redirect='/home' mustBeLoggedIn={false} {...props} />
  )
}

function ConditionalRoute({ children, redirect, mustBeLoggedIn, ...props }) {
  const [authentificated, setAuthentificated] = React.useState()
    const authData = JSON.parse(localStorage.getItem('auth_data'));
    const appToken = authData?.access_token;
    const refreshToken = authData?.refresh_token;


  React.useEffect(() => {
    const requestNewToken = async () => {
      await obtainNewTokens(refreshToken)
      setAuthentificated(true)
    }

    if(appToken === undefined && refreshToken !== undefined) requestNewToken()
    else setAuthentificated(appToken !== undefined && refreshToken !== undefined)
      // eslint-disable-next-line
  }, [])

  return (
    <Route
      {...props}
      render={({ location }) =>
        authentificated !== undefined
          ? authentificated === mustBeLoggedIn
            ? children
            : (
              <Redirect
                to={{
                  pathname: redirect,
                  state: { from: location }
                }}
              />
            )
          : <div />
      }
    />
  )
}

export default App;
