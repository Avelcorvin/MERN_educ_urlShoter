import React, {  } from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hooks'
import { Context } from './context/context'
import { Navbar } from './components/navbar';
import { Loader } from './components/loader';
import 'materialize-css'




function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthnification = !!token;
  const routers = useRoutes(isAuthnification)


  if (!ready) {
    return <Loader />
  }

  return (
    <Context.Provider value={{
      token, login, logout, userId, isAuthnification
    }}>
      <Router>
        <div className="App">
          {isAuthnification && <Navbar />}
          <div className="container">
            <h1>{routers} </h1>
          </div>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
