import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, ButtonGroup, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import CachedIcon from '@material-ui/icons/Cached';
import ReplayIcon from '@material-ui/icons/Replay';
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import proveedoresServices from "../../../services/Interlocutores/Proveedores";
import clientesServices from "../../../services/Interlocutores/Clientes";
import empleadosServices from "../../../services/Interlocutores/Empleados";
import conceptososervServices from "../../../services/GestionOrdenes/ConceptosOserv";
import crearordenesServices from "../../../services/GestionOrdenes/CrearOrdenes";
import tiposservicioServices from "../../../services/GestionOrdenes/TiposServicio";
import gruposequiposServices from "../../../services/Mantenimiento/GruposEquipos";
import subgruposequiposServices from "../../../services/Mantenimiento/SubGruposEquipos";
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clasificacionabcServices from "../../../services/Mantenimiento/ClasificacionABC";
import tiposmttoServices from "../../../services/Mantenimiento/Tiposmtto";
import tipooperacionServices from "../../../services/GestionOrdenes/TipoOperacion";
import contactosServices from "../../../services/Interlocutores/Contactos";

//Componentes Gestion de Ordenes
import MenuListaChequeo from "../MenuListaChequeo";

//import MenuCrearOrden from "../../DatosEquipos/MenuEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 290,
    maxWidth: 290,
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 600,
    maxWidth: 600,
  },
  formControl3: {
    margin: theme.spacing(0),
    minWidth: 215,
    maxWidth: 215,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed',
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, ...other } = props;
  //console.log(inputRef);
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      thousandSeparator={'.'}
      decimalSeparator={','}

    />
  );
}

function CrearListaChequeo() {
  const styles = useStyles();

  const [listarOrdenes, setListarOrdenes] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [formError, setFormError] = useState(false);

  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarTipoServicio, setListarTipoServicio] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarProveedores, setListarProveedores] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEmpleados, setListarEmpleados] = useState([]);
  const [listarGruposEquipos, setListarGruposEquipos] = useState([]);
  const [listarContactos, setListarContactos] = useState([]);
  const [listarSubGruposEquipos, setListarSubGruposEquipos] = useState([]);
  const [listarEquipos, setListarEquipos] = useState([]);
  const [listarConceptososerv, setListarConceptosOserv] = useState([]);
  const [listarClasificacionABC, setListarClasificacionABC] = useState([]);
  const [listarTiposMtto, setListarTiposMtto] = useState([]);
  const [listarTipoOperacion, setListarTipoOperacion] = useState([]);
  const [listarEstadoModificado, setListarEstadoModificado] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');

  const [estado, setEstado] = useState(1);
  let cambio = 12;
  let empresa = 1;
  let diasoperacion = 0;
  let conceptomtto = 1;
  let tipomtto = 1;
  let tipooperacion = 0;
  /*
    const [dateDMY, setDateDMY] = useState(Moment(new Date()).format('DD-MM-YYYY'));
    const [dateMDY, setDateMDY] = useState(Moment(new Date()).format('MM-DD-YYYY'));
    const [dateYMD, setDateYMD] = useState(Moment(new Date()).format('YYYY-MM-DD'));
  
    console.log("Dia,Mes,Año : ", dateDMY);
    console.log("Mes,Dia,Año : ", dateMDY);
    console.log("Año,Mes,Dia : ", dateYMD);
   */

  //const [ordenSeleccionado, setOrdenSeleccionado] = useState([]);

  const [ordenSeleccionado, setOrdenSeleccionado] = useState({
    'id_otr': "",
    'estado_otr': estado,
    'tipo_otr': tipomtto,
    'tipooperacion_otr': tipooperacion,
    'concepto_otr': conceptomtto,
    'fechaprogramada_otr': fechaactual,
    'fechainicia_otr': fechaactual,
    'fechafinal_otr': fechaactual,
    'diasoperacion_otr': 0,
    'equipo_otr': "",
    'proveedor_otr': "",
    'cliente_otr': "",
    'operario_otr': 1002,
    'grupoequipo_otr': "",
    'subgrupoequipo_otr': "",
    'ciudad_otr': "",
    'resumenorden_otr': "",
    'prioridad_otr': 1,
    'empresa_otr': 1
  })


  const leerOrdenes = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeo();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Manual", res.data);
    }
    fetchDataOrdenes();
  }

  const leerOrdenesActivas = () => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeoActivas();
      setListarOrdenes(res.data);
      //console.log("Cargar Una Orden", res.data);
    }
    fetchDataOrdenes();
  }

  useEffect(() => {
    async function fetchDataTipoOperacion() {
      const res = await tipooperacionServices.listTipooperacion();
      setListarTipoOperacion(res.data);
    }
    fetchDataTipoOperacion();
  }, [])

  useEffect(() => {
    async function fetchDataOrdenes() {
      const res = await crearordenesServices.listOrdenesChequeo();
      setListarOrdenes(res.data);
      //console.log("Lee Ordenes Automaticas", res.data);
    }
    fetchDataOrdenes();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data);
      //console.log(res.data)
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataProveedores() {
      const res = await proveedoresServices.listProveedores();
      setListarProveedores(res.data)
      //console.log(res.data);
    }
    fetchDataProveedores();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataEmpleados() {
      const res = await empleadosServices.listEmpleados();
      setListarEmpleados(res.data)
      //console.log(res.data);
    }
    fetchDataEmpleados();
  }, [])

  useEffect(() => {
    async function fetchDataConceptosOserv() {
      const res = await conceptososervServices.listConceptosOserv();
      setListarConceptosOserv(res.data)
      //console.log("CONCEPTOS ORDEN : ",res.data);
    }
    fetchDataConceptosOserv();
  }, [])

  useEffect(() => {
    async function fetchDataTiposServicio() {
      const res = await tiposservicioServices.listTiposservicio();
      setListarTipoServicio(res.data)
      //console.log("TIPOS SERVICIOS ORDEN : ",res.data);
    }
    fetchDataTiposServicio();
  }, [])

  useEffect(() => {
    async function fetchDataGruposEquipos() {
      const res = await gruposequiposServices.listGruposequipos();
      setListarGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataGruposEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataSubGruposEquipos() {
      const res = await subgruposequiposServices.listSubGruposequipos();
      setListarSubGruposEquipos(res.data)
      //console.log(res.data);
    }
    fetchDataSubGruposEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data);
    }
    fetchDataEquipos();
  }, [])

  useEffect(() => {
    async function fetchDataClasificacionABC() {
      const res = await clasificacionabcServices.listClasificacionabc();
      setListarClasificacionABC(res.data)
      //console.log(res.data);
    }
    fetchDataClasificacionABC();
  }, [])

  useEffect(() => {
    async function fetchDataTiposMtto() {
      const res = await tiposmttoServices.listTiposmtto();
      setListarTiposMtto(res.data)
      //console.log(res.data);
    }
    fetchDataTiposMtto();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setOrdenSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
  const contactosInterlocutor = (cliente) => {
    //console.log("CODIGO CLIENTE : ", cliente)

    async function fetchDataContactos() {
      const res = await contactosServices.contactosInterlocutor(cliente);
      setListarContactos(res.data);
      //console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();
  }

  const leerContactos = (cliente) => {
    //console.log("CODIGO CLIENTE : ", cliente)

    async function fetchDataContactos() {
      const res = await contactosServices.listContactosInterlocutor(cliente);
      setListarContactos(res.data);
      //console.log("CONTACTOS : ", res.data)
      if (!res.success) {
        swal("Contactos", "Cliente Seleccionado no tiene Contactos!", "warning", { button: "Aceptar" });
      }
    }
    fetchDataContactos();
  }

  const seleccionarOrden = (orden, caso) => {
    leerContactos(orden.contactocliente_otr);
    setOrdenSeleccionado(orden);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalAsignar = () => {
    setModalAsignar(!modalAsignar);
  }

  const grabarOrden = async () => {
    console.log("VALIDANDO TIPO DE OPERACION: ", ordenSeleccionado.tipooperacion_otr);

    if ((ordenSeleccionado.tipooperacion_otr != 3) && (ordenSeleccionado.tipooperacion_otr != 4)) {
      swal("Lista de Chequeo", "Esta Opción Solo Permite Ordenes de Servicio por Lista de Chequeo!", "warning", { button: "Aceptar" });
      abrirCerrarModalInsertar();
    }
    else {

      setFormError({});
      let errors = {};
      let formOk = true;
/*
      if (!ordenSeleccionado.estado_otr) {
        errors.estado_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.tipo_otr) {
        errors.tipo_otr = true;
        formOk = false;
      }
*/
      if (!ordenSeleccionado.tipooperacion_otr) {
        errors.tipooperacion_otr = true;
        formOk = false;
      }
/*
      if (!ordenSeleccionado.concepto_otr) {
        errors.concepto_otr = true;
        formOk = false;
      }
*/
      if (!ordenSeleccionado.fechaprogramada_otr) {
        errors.fechaprogramada_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.fechainicia_otr) {
        errors.fechainicia_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.fechafinal_otr) {
        errors.fechafinal_otr = true;
        formOk = false;
      }
/*
      if (!ordenSeleccionado.diasoperacion_otr) {
        errors.diasoperacion_otr = true;
        formOk = false;
      }
*/
      if (!ordenSeleccionado.equipo_otr) {
        errors.equipo_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.proveedor_otr) {
        errors.proveedor_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.cliente_otr) {
        errors.cliente_otr = true;
        formOk = false;
      }
/*
      if (!ordenSeleccionado.operario_otr) {
        errors.operario_otr = true;
        formOk = false;
      }
*/
      if (!ordenSeleccionado.contactocliente_otr) {
        errors.contactocliente_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.subgrupoequipo_otr) {
        errors.subgrupoequipo_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.ciudad_otr) {
        errors.ciudad_otr = true;
        formOk = false;
      }

      if (!ordenSeleccionado.resumenorden_otr) {
        errors.resumenorden = true;
        formOk = false;
      }

      if (!ordenSeleccionado.prioridad_otr) {
        errors.prioridad_otr = true;
        formOk = false;
      }
/*
      if (!ordenSeleccionado.tiposervicio_otr) {
        errors.tiposervicio_otr = true;
        formOk = false;
      }
*/
      setFormError(errors);

      if (formOk) {
        //console.log(ordenSeleccionado);
        const res = await crearordenesServices.save(ordenSeleccionado);

        if (res.success) {
          swal("Orden de Servicio", "Orden de Servicio Creada de forma Correcta!", "success", { button: "Aceptar" });
          //console.log(res.message)
          abrirCerrarModalInsertar();
          delete ordenSeleccionado.id_otr;
          delete ordenSeleccionado.estado_otr;
          delete ordenSeleccionado.tipooperacion_otr;
          delete ordenSeleccionado.tipo_otr;
          delete ordenSeleccionado.concepto_otr;
          delete ordenSeleccionado.fechaprogramada_otr;
          delete ordenSeleccionado.fechainicia_otr;
          delete ordenSeleccionado.fechafinal_otr;
          delete ordenSeleccionado.diasoperacion_otr;
          delete ordenSeleccionado.equipo_otr;
          delete ordenSeleccionado.proveedor_otr;
          delete ordenSeleccionado.cliente_otr;
          delete ordenSeleccionado.operario_otr;
          delete ordenSeleccionado.contactocliente_otr;
          delete ordenSeleccionado.subgrupoequipo_otr;
          delete ordenSeleccionado.ciudad_otr;
          delete ordenSeleccionado.resumenorden_otr;
          delete ordenSeleccionado.prioridad_otr;
          delete ordenSeleccionado.tiposervicio_otr;
        } else {
          swal("Orden de Servicio", "Error Creando la Orden de Servicio!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
      }
      else {
        swal("Orden de Servicio", "Debe Ingresar Todos los Datos, Error Creando la Orden de Servicio!", "warning", { button: "Aceptar" });
        console.log(ordenSeleccionado);
        console.log(res.message);
        abrirCerrarModalInsertar();
      }

    }

  }

  const actualizarOrden = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;
    /*
        if (!ordenSeleccionado.estado_otr) {
          errors.estado_otr = true;
          formOk = false;
        }
    */
    if (!ordenSeleccionado.prioridad_otr) {
      errors.prioridad_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechaprogramada_otr) {
      errors.fechaprogramada_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechainicia_otr) {
      errors.fechainicia_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.fechafinal_otr) {
      errors.fechafinal_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.equipo_otr) {
      errors.equipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.tipo_otr) {
      errors.tipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.concepto_otr) {
      errors.concepto_otr = true;
      formOk = false;
    }
    /*
        if (!ordenSeleccionado.diasoperacion_otr) {
          errors.diasoperacion_otr = true;
          formOk = false;
        }
    */

    if (!ordenSeleccionado.proveedor_otr) {
      errors.proveedor_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.cliente_otr) {
      errors.cliente_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.operario_otr) {
      errors.operario_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.contactocliente_otr) {
      errors.contactocliente_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.subgrupoequipo_otr) {
      errors.subgrupoequipo_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.ciudad_otr) {
      errors.ciudad_otr = true;
      formOk = false;
    }

    if (!ordenSeleccionado.resumenorden_otr) {
      errors.resumenorden = true;
      formOk = false;
    }


    if (!ordenSeleccionado.tiposervicio_otr) {
      errors.tiposervicio_otr = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      const res = await crearordenesServices.update(ordenSeleccionado);

      if (res.success) {
        swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete ordenSeleccionado.id_otr;
        delete ordenSeleccionado.estado_otr;
        delete ordenSeleccionado.tipo_otr;
        delete ordenSeleccionado.concepto_otr;
        delete ordenSeleccionado.fechaprogramada_otr;
        delete ordenSeleccionado.fechainicia_otr;
        delete ordenSeleccionado.fechafinal_otr;
        delete ordenSeleccionado.diasoperacion_otr;
        delete ordenSeleccionado.equipo_otr;
        delete ordenSeleccionado.proveedor_otr;
        delete ordenSeleccionado.cliente_otr;
        delete ordenSeleccionado.operario_otr;
        delete ordenSeleccionado.contactocliente_otr;
        delete ordenSeleccionado.subgrupoequipo_otr;
        delete ordenSeleccionado.ciudad_otr;
        delete ordenSeleccionado.resumenorden_otr;
        delete ordenSeleccionado.prioridad_otr;
        delete ordenSeleccionado.tiposervicio_otr;
      } else {
        swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Orden de Servicio", "Debe Ingresar Todos los Datos, Error Actualizando la Orden de Servicio!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
  }

  const asignarEstado = async () => {
    console.log("EN ASIGNAR  ESTADO : ", listarEstadoModificado)

    const res = await crearordenesServices.updateestadoasignado(ordenSeleccionado);

    if (res.success) {
      swal("Orden de Servicio", "Orden de Servicio Actualizada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalAsignar();
    } else {
      swal("Orden de Servicio", "Error Actualizando la Orden de Servicio!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalAsignar();
    }
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'id_otr',
      title: '# Orden',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_tope',
      title: 'Tipo de Operación',
      cellStyle: { minWidth: 200 }
    },
    {
      field: 'nombre_est',
      title: 'Estado',
      cellStyle: { minWidth: 80 }
    },
    {
      field: 'descripcion_tmt',
      title: 'Tipo de Orden',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'fechaprogramada_otr',
      title: 'Fecha de Programación',
      type: 'date'
    },
    {
      field: 'codigo_equ',
      title: 'Equipo',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'razonsocial_int',
      title: 'Proveedor',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'razonsocial_cli',
      title: 'Cliente',
      cellStyle: { minWidth: 150 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'descripcion_abc',
      title: 'Prioridad de la Orden',
      cellStyle: { minWidth: 100 }
    }
  ]

  const ordenInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Orden Chequeo de Equipos
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={3}> <TextField name="id_otr" label="# Orden Chequeo Entrega  " disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselecttipooperacion_otr">Tipo de Operación</InputLabel>
            <Select
              labelId="selecttipooperacion_otr"
              name="tipooperacion_otr"
              id="idselecttipooperacion_otr"
              fullWidth
              defaultValue={tipooperacion}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoOperacion.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tope}>{itemselect.descripcion_tope}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectestado_otr">Estado</InputLabel>
            <Select
              labelId="selectestado_otr"
              name="estado_otr"
              id="idselectestado_otr"
              fullWidth
              disabled="true"
              defaultValue={estado}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl className={styles.formControl3}>
            <InputLabel id="idselectprioridad_otr">Prioridad</InputLabel>
            <Select
              labelId="prioridad_otr"
              name="prioridad_otr"
              id="idselectprioridad_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClasificacionABC.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_abc}>{itemselect.descripcion_abc}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaprogramada_otr"
          label="Fecha de Creación de Orden" fullWidth onChange={handleChange} defaultValue={fechaactual} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_otr"
          label="Fecha en que Inicia" fullWidth onChange={handleChange} defaultValue={fechaactual} />
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_otr"
          label="Fecha de Cierre" fullWidth onChange={handleChange} defaultValue={fechaactual} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
            <Select
              labelId="selectequipo_otr"
              name="equipo_otr"
              id="idselectequipo_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}> <TextField type="number" name="diasoperacion_otr" label="Cuantos días duro la Actividad"
          fullWidth onChange={handleChange} disabled="true" defaultValue={diasoperacion} />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipo_otr">Tipo de Mantenimiento</InputLabel>
            <Select
              labelId="selecttipo_otr"
              name="tipo_otr"
              id="idselecttipo_otr"
              fullWidth
              disabled="true"
              defaultValue={tipomtto}
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTiposMtto.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tmt}>{itemselect.descripcion_tmt}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectconcepto_otr">Concepto del Mantenimiento</InputLabel>
            <Select
              labelId="selectconcepto_otr"
              name="concepto_otr"
              id="idselectconcepto_otr"
              disabled="true"
              defaultValue={conceptomtto}
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarConceptososerv.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_con}>{itemselect.descripcion_con}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttiposervicio_otr" >Tipo de Servicio de la Orden</InputLabel>
            <Select
              labelId="selectiposervicio_otr"
              name="tiposervicio_otr"
              id="idselecttiposervicio_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarTipoServicio.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tser}>{itemselect.descripcion_tser}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="proveedor_otr">Proveedor</InputLabel>
            <Select
              labelId="selectproveedor_otr"
              name="proveedor_otr"
              id="idselectproveedor_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarProveedores.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="cliente_otr">Cliente</InputLabel>
            <Select
              labelId="selectcliente_otr"
              name="cliente_otr"
              id="idselectcliente_otr"
              fullWidth
              onChange={handleChange}
              onClick={(e) => contactosInterlocutor(e.target.value)}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="operario_otr">Operario</InputLabel>
            <Select
              labelId="selectoperario_otr_otr"
              name="operario_otr"
              id="idselectoperario_otr"
              defaultValue={1002}
              fullWidth
              disabled="true"
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpleados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ }{itemselect.primer_apellido_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl className={styles.formControl}>
            <InputLabel id="idselectcontactocliente_otr">Contacto</InputLabel>
            <Select
              labelId="selectcontactocliente_otr"
              name="contactocliente_otr"
              id="idselectcontactocliente_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarContactos ?
                  listarContactos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_con}>{itemselect.primer_nombre_con}{" "}{itemselect.primer_apellido_con}</MenuItem>
                    )
                  })
                  :
                  console.log("Sin Datos")
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectsubgrupoequipo_otr">SubGrupo del Equipo</InputLabel>
            <Select
              labelId="subgrupoequipo_otr"
              name="subgrupoequipo_otr"
              id="idselectsubgrupoequipo_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarSubGruposEquipos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectciudad_otr">Ciudad</InputLabel>
            <Select
              labelId="ciudad_otr"
              name="ciudad_otr"
              id="idselectciudad_otr"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectempresa_otr" >Empresa</InputLabel>
            <Select
              labelId="selectempresa_otr"
              name="empresa_otr"
              id="idselectempresa_otr"
              fullWidth
              onChange={handleChange}
              disabled="true"
              defaultValue={empresa}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="resumenorden_otr" label="Resumen de la Orden" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => grabarOrden()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const ordenEditar = (
    <div className="App" >
      <div className={styles.modal}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Actualizar Orden de Chequeo Equipo
        </Typography>
        <Grid container spacing={2} >
          <Grid item xs={12} md={4}> <TextField name="id_otr" label="# Orden Chequeo Entrega Equipo" disabled="true"
            defaultValue={ordenSeleccionado.id_otr}
            fullWidth onChange={handleChange} value={ordenSeleccionado && ordenSeleccionado.id_otr} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectestado_otr">Estado</InputLabel>
              <Select
                labelId="selectestado_otr"
                name="estado_otr"
                id="idselectestado_otr"
                fullWidth
                disabled="true"
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.estado_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEstados.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectprioridad_otr">Prioridad</InputLabel>
              <Select
                labelId="prioridad_otr"
                name="prioridad_otr"
                id="idselectprioridad_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.prioridad_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarClasificacionABC.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_abc}>{itemselect.descripcion_abc}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechaprogramada_otr"
            defaultValue={Moment(ordenSeleccionado.fechaprogramada_otr).format('YYYY-MM-DD')}
            label="Fecha de Creación de Orden" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechainicia_otr"
            defaultValue={Moment(ordenSeleccionado.fechainicia_otr).format('YYYY-MM-DD')}
            label="Fecha en que Inicia" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="date" InputLabelProps={{ shrink: true }} name="fechafinal_otr"
            defaultValue={Moment(ordenSeleccionado.fechafinal_otr).format('YYYY-MM-DD')}
            label="Fecha de Cierre" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl className={styles.formControl2}>
              <InputLabel id="idselectequipo_otr">Equipo</InputLabel>
              <Select
                labelId="selectequipo_otr"
                name="equipo_otr"
                id="idselectequipo_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.equipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEquipos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_equ}>{itemselect.codigo_equ}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}> <TextField type="number" name="diasoperacion_otr" label="Cuantos días duro la Actividad"
            disabled="true" defaultValue={diasoperacion}
            fullWidth onChange={handleChange} value={ordenSeleccionado && ordenSeleccionado.diasoperacion_otr} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselecttipo_otr">Tipo de Mantenimiento</InputLabel>
              <Select
                labelId="selecttipo_otr"
                name="tipo_otr"
                id="idselecttipo_otr"
                fullWidth
                onChange={handleChange}
                disabled="true"
                value={ordenSeleccionado && ordenSeleccionado.tipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTiposMtto.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tmt}>{itemselect.descripcion_tmt}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectconcepto_otr">Concepto del Mantenimiento</InputLabel>
              <Select
                labelId="selectconcepto_otr"
                name="concepto_otr"
                id="idselectconcepto_otr"
                fullWidth
                disabled="true"
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.concepto_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarConceptososerv.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_con}>{itemselect.descripcion_con}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselecttiposervicio_otr" >Tipo de Servicio de la Orden</InputLabel>
              <Select
                labelId="selectiposervicio_otr"
                name="tiposervicio_otr"
                id="idselecttiposervicio_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.tiposervicio_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarTipoServicio.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_tser}>{itemselect.descripcion_tser}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="proveedor_otr">Proveedor</InputLabel>
              <Select
                labelId="selectproveedor_otr"
                name="proveedor_otr"
                id="idselectproveedor_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.proveedor_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarProveedores.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_int}>{itemselect.razonsocial_int}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="cliente_otr">Cliente</InputLabel>
              <Select
                labelId="selectcliente_otr"
                name="cliente_otr"
                id="idselectcliente_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.cliente_otr}
                onClick={(e) => leerContactos(e.target.value)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarClientes.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="operario_otr">Operario</InputLabel>
              <Select
                labelId="selectoperario_otr_otr"
                name="operario_otr"
                id="idselectoperario_otr"
                fullWidth
                disabled="true"
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.operario_otr}
                onClick={() => setEstado(16)}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarEmpleados.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_emp}>{itemselect.primer_nombre_emp}{ }{itemselect.primer_apellido_emp}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
          <FormControl className={styles.formControl}>
              <InputLabel id="idselectcontactocliente_otr">Contacto</InputLabel>
              <Select
                labelId="selectcontactocliente_otr"
                name="contactocliente_otr"
                id="idselectcontactocliente_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.contactocliente_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarContactos ?
                    listarContactos.map((itemselect) => {
                      return (
                        <MenuItem value={itemselect.id_con}>{itemselect.primer_nombre_con}{" " }{itemselect.primer_apellido_con}</MenuItem>
                      )
                    })
                    :
                    console.log("Sin Datos")
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectsubgrupoequipo_otr">SubGrupo del Equipo</InputLabel>
              <Select
                labelId="subgrupoequipo_otr"
                name="subgrupoequipo_otr"
                id="idselectsubgrupoequipo_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.subgrupoequipo_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarSubGruposEquipos.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_sgre}>{itemselect.descripcion_sgre}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl className={styles.formControl}>
              <InputLabel id="idselectciudad_otr">Ciudad</InputLabel>
              <Select
                labelId="ciudad_otr"
                name="ciudad_otr"
                id="idselectciudad_otr"
                fullWidth
                onChange={handleChange}
                value={ordenSeleccionado && ordenSeleccionado.ciudad_otr}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {
                  listarCiudades.map((itemselect) => {
                    return (
                      <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField name="resumenorden_otr" label="Resumen de la Orden" fullWidth onChange={handleChange}
              value={ordenSeleccionado && ordenSeleccionado.resumenorden_otr} />
          </Grid>
        </Grid>
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={() => actualizarOrden()} >Editar</Button>
          <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
        <MenuListaChequeo ordenServicio={ordenSeleccionado.id_otr} tipoOperacion={ordenSeleccionado.tipooperacion_otr} />
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <ButtonGroup >
        <Button className={styles.button}
          variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()}
        > Crear Orden de Chequeo Equipos
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="contained" startIcon={<CachedIcon />} color="primary" onClick={() => leerOrdenes()} >Todas las Ordenes</Button>
        <Button variant="contained" startIcon={<ReplayIcon />} color="primary" onClick={() => leerOrdenesActivas()}>Ordenes Activas</Button>
      </ButtonGroup>
      <MaterialTable
        columns={columnas}
        data={listarOrdenes}
        title="ORDENES DE CHEQUEO EQUIPOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Orden',
            onClick: (event, rowData) => seleccionarOrden(rowData, "Editar")
          }
        ]}
        options={{
          actionsColumnIndex: 11
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        detailPanel={[
          {
            tooltip: 'Estados del Equipo',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                 <Button variant="contained">Datos Contacto: {rowData.primer_nombre_con} { } {rowData.primer_apellido_con} { }
                          Telefono: {rowData.telefono_con} { } email: {rowData.email_con}{ }
                  </Button>
                </div>
              )
            },
          },
        ]}
      />
      {}
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {ordenInsertar}
      </Modal>
      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {ordenEditar}
      </Modal>
    </div>
  );
}

export default CrearListaChequeo;