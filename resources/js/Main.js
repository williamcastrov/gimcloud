import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import firebase from "./server/firebase";
import "firebase/auth";
import "./app.scss";

// Componentes Menu Bar
import AppNavbar from "./layouts/AppNavbar/";
import theme from "./theme";

// Componentes de Logueo
import Login from './components/Auth/Login';
import RegistrarUsuario from "./components/Auth/RegistrarUsuario";
import Auth from "./pages/Auth";
import Management from './components/Management/Management';

// Componentes adicionales
import Paises from './pages/Parameters/Paises';
import Empresa from './pages/Parameters/Empresa/Empresa';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function Main() {
  const [user, setUser] = useState(false);
  const [componente, setComponente ] = useState("1");

  firebase.auth().onAuthStateChanged(currentUser => {

    console.log(currentUser ? "Estamos Logueados" : "No estamos logueados")
    if (currentUser) {
      setUser(true);
    } else {
      setUser(false);
    }
    console.log(user);
  });

  return (
    <>
      {!user
        ? <Auth />
        :
        <Router >
          <ThemeProvider theme={theme}>
            <AppNavbar />
            <Switch>
              { componente === "1" ? 
              <Route path="/gim" component={Management} /> 
              :
              <Route path="/login" component={Login} />
              }
              <Route path="/auth/registrarusuario" component={RegistrarUsuario} />
              <Route path="/login" component={Login} />

              <Route path="/parametros/paises" component={Paises} />
              <Route path="/parametros/empresa" component={Empresa} />
      
            </Switch>
          </ThemeProvider>
        </Router>
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        puaseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>

  )
}

export default Main;