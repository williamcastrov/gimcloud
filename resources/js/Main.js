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

// Componentes Modulo Parametros Genrales
import Paises from './pages/Parameters/Paises';
import Regiones from './pages/Parameters/Regiones';
import Empresa from './pages/Parameters/Empresa';
import Departamentos from './pages/Parameters/Departamentos';
import Ciudades from './pages/Parameters/Ciudades';
import Estados from './pages/Parameters/Estados';
import Unidades from './pages/Parameters/Unidades';
import Monedas from './pages/Parameters/Monedas';

// Componentes Modulo Gestión Mantenimiento
import Frecuencias from './pages/Mantenimiento/Frecuencias';
import Equipos from './pages/Mantenimiento/Equipos';
import Accesorios from './pages/Mantenimiento/Accesorios';
import ExtrasEquipos from './pages/Mantenimiento/ExtrasEquipos';
import Gruposequipos from './pages/Mantenimiento/Gruposequipos';
import SubGrupospartes from './pages/Mantenimiento/SubGrupospartes';
import Referencias from './pages/Mantenimiento/Referencias';
import Marcas from './pages/Mantenimiento/Marcas';
import ClasificacionABC from './pages/Mantenimiento/ClasificacionABC';
import EstadosClientes from './pages/Mantenimiento/EstadosClientes';
import EstadosMtto from './pages/Mantenimiento/EstadosMtto';
import EstadosCalidad from './pages/Mantenimiento/EstadosCalidad/EstadosCalidad';

// Componentes Modulo Gestión Ordenes de Servicios
import Tiposmtto from './pages/GestionOrdenes/Parameters/Tiposmtto';
import TipoOperacion from './pages/GestionOrdenes/Parameters/TipoOperacion';
import TiposServicio from './pages/GestionOrdenes/Parameters/TiposServicio';
import ActividadRealizada from "./pages/GestionOrdenes/Parameters/ActividadRealizada";
import ConceptosOserv from './pages/GestionOrdenes/Parameters/ConceptosOserv/ConceptosOserv';
import Ordenes from './pages/GestionOrdenes/Ordenes';
import CrearOrdenes from './pages/GestionOrdenes/CrearOrdenes';

// Componentes Modulo Datos Adicionales Equipos
import TipoGarantia from './pages/DatosEquipos/TipoGarantia';
import Garantias from './pages/DatosEquipos/Garantias';
import Contratos from './pages/DatosEquipos/Contratos';
import FichaTecnica from './pages/DatosEquipos/FichaTecnica';
import TiposLlantas from './pages/DatosEquipos/TiposLlantas';
import TiposEquipos from './pages/DatosEquipos/TiposEquipos';
import Ubicaciones from './pages/DatosEquipos/Ubicaciones';
import Seguros from './pages/DatosEquipos/Seguros';

// Componentes Modulo Gestión de Almacenes
import TiposAlmacenes from './pages/Almacenes/TiposAlmacenes';
import LineasProductos from './pages/Almacenes/LineasProductos';
import Inventarios from './pages/Almacenes/Inventarios';
import CrearAlmacenes from './pages/Almacenes/CrearAlmacenes';

// Componentes Modulo Lista de Chequeo de Equipos
import EntregaEquipos from './pages/ListaChequeo/EntregaEquipos';
import RecepcionEquipos from './pages/ListaChequeo/RecepcionEquipos';
import PanelListaChequeo from './pages/ListaChequeo/PanelListaChequeo';

//Componentes Modulo Interlocutores
import TipoInterlocutores from './pages/Interlocutores/Parameters/TipoInterlocutores';
import Especialidades from './pages/Interlocutores/Parameters/Especialidades';
import Proveedores from './pages/Interlocutores/Proveedores';
import Clientes from './pages/Interlocutores/Clientes';
import Empleados from './pages/Interlocutores/Empleados';
import Contactos from './pages/Interlocutores/Contactos';

//Componentes Modulo Activos
import Areas from './pages/Activos/Areas';
import Cencostos from './pages/Activos/Cencostos';

//Impresión PDF
import ImprimirOT from './pages/Listar/Ordenes/OrdenesPdf';
import ImprimirOTChequeo from './pages/Listar/Ordenes/OrdenChequeoPdf';
import PrincipalPDF from './components/Pdf/VisualizarPDF/PrincipalPDF.js';
import Pdf from './components/Pdf/VisualizarPDF/Pdf';  

//Impresión PDF
import Cliente from './components/SubirArchivos/Cliente';

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
              <Route path="/parametros/unidades" component={Unidades} />
              <Route path="/parametros/monedas" component={Monedas} />

              <Route path="/interlocutores/tipointerlocutores" component={TipoInterlocutores} />
              <Route path="/interlocutores/especialidades" component={Especialidades} />
              <Route path="/interlocutores/proveedores" component={Proveedores} />
              <Route path="/interlocutores/clientes" component={Clientes} />
              <Route path="/interlocutores/empleados" component={Empleados} />
              <Route path="/interlocutores/contactos" component={Contactos} />

              <Route path="/almacenes/tiposalmacenes" component={TiposAlmacenes} />
              <Route path="/almacenes/lineasproductos" component={LineasProductos} />
              <Route path="/almacenes/crearalmacenes" component={CrearAlmacenes} />
              <Route path="/almacenes/inventarios" component={Inventarios} />

              <Route path="/mantenimiento/marcas" component={Marcas} />
              <Route path="/mantenimiento/tiposllantas" component={TiposLlantas} />
              <Route path="/mantenimiento/tiposequipos" component={TiposEquipos} />
              <Route path="/mantenimiento/estadosclientes" component={EstadosClientes} />
              <Route path="/mantenimiento/estadosmtto" component={EstadosMtto} />
              <Route path="/mantenimiento/estadoscalidad" component={EstadosCalidad} />
       
              <Route path="/mantenimiento/gruposequipos" component={Gruposequipos} />
              <Route path="/mantenimiento/subgrupospartes" component={SubGrupospartes} />
              <Route path="/mantenimiento/clasificacionABC" component={ClasificacionABC} />
              <Route path="/mantenimiento/referencias" component={Referencias} />
              <Route path="/mantenimiento/frecuencias" component={Frecuencias} />
              <Route path="/mantenimiento/equipos" component={Equipos} />
              <Route path="/mantenimiento/extrasequipos" component={ExtrasEquipos} />
              <Route path="/mantenimiento/accesorios" component={Accesorios} />
              <Route path="/mantenimiento/tipogarantia" component={TipoGarantia} />
              <Route path="/mantenimiento/garantias" component={Garantias} />
              <Route path="/mantenimiento/contratos" component={Contratos} />
              <Route path="/mantenimiento/fichatecnica" component={FichaTecnica} />
              <Route path="/mantenimiento/ubicaciones" component={Ubicaciones} />
              <Route path="/mantenimiento/seguros" component={Seguros} />

              <Route path="/gestionordenes/ordenes" component={Ordenes} />
              <Route path="/gestionordenes/crearordenes" component={CrearOrdenes} />
              <Route path="/gestionordenes/actividadrealizada" component={ActividadRealizada} />
              <Route path="/mantenimiento/tiposmtto" component={Tiposmtto} />
              <Route path="/mantenimiento/conceptososerv" component={ConceptosOserv} />
              <Route path="/mantenimiento/tipooperacion" component={TipoOperacion} />
              <Route path="/mantenimiento/tiposservicio" component={TiposServicio} />

              <Route path="/listachequeo/panellistachequeo" component={PanelListaChequeo} />
              <Route path="/listachequeo/entregaequipos" component={EntregaEquipos} />
              <Route path="/listachequeo/recepcionequipos" component={RecepcionEquipos} />

              <Route path="/activos/areas" component={Areas} />
              <Route path="/activos/cencostos" component={Cencostos} />

              <Route path="/pdf/imprimirot" component={ImprimirOT} />
              <Route path="/pdf/imprimirotchequeo" component={ImprimirOTChequeo} />
              <Route path="/pdf/PrincipalPDF" component={PrincipalPDF} />
              <Route path="/pdf/Pdf" component={Pdf} />

              <Route path="/informes/clientes" component={Cliente} />
              
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

//  <Route path="/parametros/paises" component={Paises}/>
