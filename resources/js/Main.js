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
import Regiones from './pages/Parameters/Regiones';
import Empresa from './pages/Parameters/Empresa';
import Departamentos from './pages/Parameters/Departamentos';
import Ciudades from './pages/Parameters/Ciudades';

import Estados from './pages/Parameters/Estados';
import Frecuencias from './pages/Parameters/Frecuencias';
import Tiposmtto from './pages/Parameters/Tiposmtto';

//Componentes Modulo Interlocutores
import TipoInterlocutores from './pages/Interlocutores/Parameters/TipoInterlocutores';
import Especialidades from './pages/Interlocutores/Parameters/Especialidades';
import Proveedores from './pages/Interlocutores/Proveedores';
import Clientes from './pages/Interlocutores/Clientes';
import Unidades from './pages/Parameters/Unidades';
import Monedas from './pages/Parameters/Monedas';
import Empleados from './pages/Interlocutores/Empleados';
import Marcas from './pages/Mantenimiento/Marcas';
import Areas from './pages/Activos/Areas';
import Cencostos from './pages/Activos/Cencostos';
import Equipos from './pages/Mantenimiento/Equipos';
import Garantias from './pages/Mantenimiento/Garantias';

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

              <Route path="/parametros/paises" component={Paises}/>
              <Route path="/parametros/regiones" component={Regiones}/>
              <Route path="/parametros/empresa" component={Empresa} />
              <Route path="/parametros/departamentos" component={Departamentos} />
              <Route path="/parametros/ciudades" component={Ciudades} />
              <Route path="/parametros/estados" component={Estados} />
              <Route path="/parametros/frecuencias" component={Frecuencias} />
              <Route path="/parametros/tiposmtto" component={Tiposmtto} />
              <Route path="/parametros/unidades" component={Unidades} />
              <Route path="/parametros/monedas" component={Monedas} />

              <Route path="/interlocutores/tipointerlocutores" component={TipoInterlocutores} />
              <Route path="/interlocutores/especialidades" component={Especialidades} />
              <Route path="/interlocutores/proveedores" component={Proveedores} />
              <Route path="/interlocutores/clientes" component={Clientes} />
              <Route path="/interlocutores/empleados" component={Empleados} />

              <Route path="/mantenimiento/marcas" component={Marcas} />
              <Route path="/mantenimiento/equipos" component={Equipos} />
              <Route path="/mantenimiento/garantias" component={Garantias} />

              <Route path="/activos/areas" component={Areas} />
              <Route path="/activos/cencostos" component={Cencostos} />
              
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