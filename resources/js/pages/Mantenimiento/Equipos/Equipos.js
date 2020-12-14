import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import {Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

// Componentes de Conexion con el Backend
import empresasServices from "../../../services/Empresa";
import estadosServices from "../../../services/Parameters/Estados";
import clasificacionabcServices from "../../../services/Mantenimiento/ClasificacionABC";
import cencostosServices from "../../../services/Activos/Cencostos";
import frecuenciasServices from "../../../services/Parameters/Frecuencias";
import propietariosServices from "../../../services/Interlocutores/Clientes";
import marcasServices from "../../../services/Mantenimiento/Marcas";
import monedasServices from "../../../services/Parameters/Monedas";
import tiposequiposServices from "../../../services/Mantenimiento/TiposEquipos";
import equiposServices from "../../../services/Mantenimiento/Equipos";

// Datos Adicionales de los Equipos
import DatosEquipos from "./DatosEquipos";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 700,
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
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
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
}));

function Equipos() {
  const styles = useStyles();
  const [listarEquipos, setListarEquipos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);

  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarClasificacionabc, setListarClasificacionabc] = useState([]);
  const [listarCencostos, setListarCencostos] = useState([]);
  const [listarFrecuencias, setListarFrecuencias] = useState([]);
  const [listarPropietarios, setListarPropietarios] = useState([]);
  const [listarMarcas, setListarMarcas] = useState([]);
  const [listarMonedas, setListarMonedas] = useState([]);
  const [listarTiposEquipos, setListarTiposEquipos] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
        'id_equ': "",
        'codigo_equ': "",
        'empresa_equ': "",
        'nombre_equ': "",
        'grupo_equ': "",
        'subgrupo_equ': "",
        'frecuencia_equ': "",
        'estado_equ': "",
        'propietario_equ': "",
        'marca_equ': "",
        'modelo_equ': "",
        'antiguedad_equ': "",
        'tipoequipo_equ': "",
        'serie_equ': "",
        'fechacreacion_equ': "",
        'fechamodificacion_equ': "",
        'direccion_equ': "",
        'valoradquisicion': "",
        'tipomoneda_equ': "",
        'clasificacionABC_equ': "",
        'centrodecosto_equ': "",
        'fechainiciagarantia_equ': "",
        'fechafingarantia_equ': ""
  })

  useEffect(() => {
    async function fetchDataEquipos() {
      const res = await equiposServices.listEquipos();
      setListarEquipos(res.data);
      //console.log(res.data)
    }
    fetchDataEquipos();
  }, [])

  useEffect (() => {
      async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])
  
  useEffect (() => {
    async function fetchDataClasificacionabc() {
    const res = await clasificacionabcServices.listClasificacionabc();
    setListarClasificacionabc(res.data) 
    //console.log(res.data);
  }
  fetchDataClasificacionabc();
  }, [])

  useEffect (() => {
    async function fetchDataCencostos() {
    const res = await cencostosServices.listCencostos();
    setListarCencostos(res.data) 
    //console.log(res.data);
  }
  fetchDataCencostos();
  }, [])
  
  useEffect (() => {
    async function fetchDataFrecuencias() {
    const res = await frecuenciasServices.listFrecuencias();
    setListarFrecuencias(res.data) 
    //console.log(res.data);
  }
  fetchDataFrecuencias();
  }, [])

  useEffect (() => {
    async function fetchDataPropietarios() {
    const res = await propietariosServices.listClientes();
    setListarPropietarios(res.data) 
    //console.log(res.data);
  }
  fetchDataPropietarios();
  }, [])
  
  useEffect (() => {
    async function fetchDataMarcas() {
    const res = await marcasServices.listMarcas();
    setListarMarcas(res.data) 
    //console.log(res.data);
  }
  fetchDataMarcas();
  }, [])

  useEffect (() => {
    async function fetchDataMonedas() {
    const res = await monedasServices.listMonedas();
    setListarMonedas(res.data) 
    //console.log(res.data);
  }
  fetchDataMonedas();
  }, [])
  
  useEffect (() => {
    async function fetchDataTiposEquipos() {
    const res = await tiposequiposServices.listTiposEquipos();
    setListarTiposEquipos(res.data) 
    //console.log(res.data);
  }
  fetchDataTiposEquipos();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setEquiposSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEquipo=(equipo, caso)=>{
    setEquiposSeleccionado(equipo);
    (caso==="Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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

  const grabarEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.codigo_equ) {
      errors.codigo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.empresa_equ) {
      errors.empresa_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.nombre_equ) {
      errors.nombre_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.grupo_equ) {
      errors.grupo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.subgrupo_equ) {
      errors.subgrupo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.frecuencia_equ) {
      errors.frecuencia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estado_equ) {
      errors.estado_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.propietario_equ) {
      errors.propietario_equ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.marca_equ) {
      errors.marca_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.modelo_equ) {
      errors.modelo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.antiguedad_equ) {
      errors.antiguedad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.tipoequipo_equ) {
      errors.tipoequipo_equ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.serie_equ) {
      errors.serie_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechacreacion_equ) {
      errors.fechacreacion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechamodificacion_equ) {
      errors.fechamodificacion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.direccion_equ) {
      errors.direccion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.valoradquisicion) {
      errors.valoradquisicion = true;
      formOk = false;
    }

    if (!equiposSeleccionado.tipomoneda_equ) {
      errors.tipomoneda_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.clasificacionABC_equ) {
      errors.clasificacionABC_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.centrodecosto_equ) {
      errors.centrodecosto_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechainiciagarantia_equ) {
      errors.fechainiciagarantia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechafingarantia_equ) {
      errors.fechafingarantia_equ = true;
      formOk = false;
    }
    
    setFormError(errors);

    if (formOk) {
      //console.log(equiposSeleccionado);
      const res = await equiposServices.save(equiposSeleccionado);

      if (res.success) {
        alert("Equipo Creado de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.empresa_equ;
        delete equiposSeleccionado.nombre_equ;
        delete equiposSeleccionado.grupo_equ;
        delete equiposSeleccionado.subgrupo_equ;
        delete equiposSeleccionado.frecuencia_equ;
        delete equiposSeleccionado.estado_equ;
        delete equiposSeleccionado.propietario_equ;
        delete equiposSeleccionado.marca_equ;
        delete equiposSeleccionado.modelo_equ;
        delete equiposSeleccionado.antiguedad_equ;
        delete equiposSeleccionado.tipoequipo_equ;
        delete equiposSeleccionado.serie_equ;
        delete equiposSeleccionado.fechacreacion_equ;
        delete equiposSeleccionado.fechamodificacion_equ;
        delete equiposSeleccionado.direccion_equ;
        delete equiposSeleccionado.valoradquisicion;
        delete equiposSeleccionado.tipomoneda_equ;
        delete equiposSeleccionado.clasificacionABC_equ;
        delete equiposSeleccionado.centrodecosto_equ;
        delete equiposSeleccionado.fechainiciagarantia_equ;
        delete equiposSeleccionado.fechafingarantia_equ;
      } else
      {
        alert("Error Creando el Equipo");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Equipo");
      console.log(equiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarEquipo = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.codigo_equ) {
      errors.codigo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.empresa_equ) {
      errors.empresa_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.nombre_equ) {
      errors.nombre_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.grupo_equ) {
      errors.grupo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.subgrupo_equ) {
      errors.subgrupo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.frecuencia_equ) {
      errors.frecuencia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.estado_equ) {
      errors.estado_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.propietario_equ) {
      errors.propietario_equ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.marca_equ) {
      errors.marca_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.modelo_equ) {
      errors.modelo_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.antiguedad_equ) {
      errors.antiguedad_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.tipoequipo_equ) {
      errors.tipoequipo_equ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.serie_equ) {
      errors.serie_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechacreacion_equ) {
      errors.fechacreacion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechamodificacion_equ) {
      errors.fechamodificacion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.direccion_equ) {
      errors.direccion_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.valoradquisicion) {
      errors.valoradquisicion = true;
      formOk = false;
    }

    if (!equiposSeleccionado.tipomoneda_equ) {
      errors.tipomoneda_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.clasificacionABC_equ) {
      errors.clasificacionABC_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.centrodecosto_equ) {
      errors.centrodecosto_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechainiciagarantia_equ) {
      errors.fechainiciagarantia_equ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechafingarantia_equ) {
      errors.fechafingarantia_equ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    console.log(equiposSeleccionado.codigo_equ);
    const res = await equiposServices.update(equiposSeleccionado);

    if (res.success) {
        alert("Maquina actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.empresa_equ;
        delete equiposSeleccionado.nombre_equ;
        delete equiposSeleccionado.grupo_equ;
        delete equiposSeleccionado.subgrupo_equ;
        delete equiposSeleccionado.frecuencia_equ;
        delete equiposSeleccionado.estado_equ;
        delete equiposSeleccionado.propietario_equ;
        delete equiposSeleccionado.marca_equ;
        delete equiposSeleccionado.modelo_equ;
        delete equiposSeleccionado.antiguedad_equ;
        delete equiposSeleccionado.tipoequipo_equ;
        delete equiposSeleccionado.serie_equ;
        delete equiposSeleccionado.fechacreacion_equ;
        delete equiposSeleccionado.fechamodificacion_equ;
        delete equiposSeleccionado.direccion_equ;
        delete equiposSeleccionado.valoradquisicion;
        delete equiposSeleccionado.tipomoneda_equ;
        delete equiposSeleccionado.clasificacionABC_equ;
        delete equiposSeleccionado.centrodecosto_equ;
        delete equiposSeleccionado.fechainiciagarantia_equ;
        delete equiposSeleccionado.fechafingarantia_equ;
    } else
    {
        alert("Error Actualizando el Equipo");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Equipo");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarEquipo = async()=>{
   
    const res = await equiposServices.delete(equiposSeleccionado.id_equ);

    if (res.success) {
        alert("Equipo Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Equipo");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
  {
    field: 'id_equ',
    title: 'Id'
  },
  {
    field: 'codigo_equ',
    title: 'Codigo',
  },
  {
    field: 'empresa_equ',
    title: 'Empresa'
  },
  {
    field: 'nombre_emp',
    title: 'Nombre Empresa'
  },
  {
    field: 'nombre_equ',
    title: 'Descripción  del Equipo'
  },
  {
    field: 'grupo_equ',
    title: 'Cod. Grupo'
  },
  {
    field: 'subgrupo_equ',
    title: 'Cod. SubGrupo'
  },
  {
    field: 'frecuencia_equ',
    title: 'Frecuencia'
  },
  {
    field: 'nombre_fre',
    title: 'Descripcion de la Frecuencia'
  },
  {
    field: 'estado_equ',
    title: 'Estado'
  },
  {
    field: 'nombre_est',
    title: 'Descripción Estado'
  },
  {
    field: 'propietario_equ',
    title: 'Propietario'
  },
  {
    field: 'razonsocial_int',
    title: 'Nombre Propietario'
  },
  {
    field: 'marca_equ',
    title: 'Cod. Marca'
  },
  {
    field: 'nombre_mar',
    title: 'Nombre Marca Equipo'
  },
  {
    field: 'modelo_equ',
    title: 'Modelo del Equipo'
  },
  {
    field: 'antiguedad_equ',
    title: 'Antiguedad'
  },
  {
    field: 'tipoequipo_equ',
    title: 'Tipo'
  },
  {
    field: 'Descripción del tipo de Equipo',
    title: 'nombre_tequ'
  },
  {
    field: 'serie_equ',
    title: 'Serie'
  },
  {
    field: 'fechacreacion_equ',
    title: 'Fecha de Creación'
  },
  {
    field: 'fechamodificacion_equ',
    title: 'Fecha de Modificacón'
  },
  {
    field: 'direccion_equ',
    title: 'Dirección'
  },
  {
    field: 'valoradquisicion',
    title: 'Valor de Compra'
  },
  {
    field: 'tipomoneda_equ',
    title: 'Modena'
  },
  {
    field: 'nombre_mon',
    title: 'Nombre Moneda'
  },
  {
    field: 'clasificacionABC_equ',
    title: 'Clasificación'
  },
  {
    field: 'nombre_abc',
    title: 'Descripción Clasificación'
  },
  {
    field: 'centrodecosto_equ',
    title: 'CC'
  },
  {
    field: 'nombre_cco',
    title: 'Nombre Cencosto'
  },
  {
    field: 'fechainiciagarantia_equ',
    title: 'Fecha Inicia Garantía'
  },
  {
    field: 'fechafingarantia_equ',
    title: 'Fecha Fin Garantía'
  }
  ]
  
  const equipoInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Equipo</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_equ" label="Codigo Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_equ"
                id="idselectEmpresa"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="nombre_equ" label="Descripción del Equipo" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="grupo_equ" label="Código Grupo" fullWidth onChange={handleChange} /> </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="subgrupo_equ" label="Código SubGrupo" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> 
        <FormControl className={styles.formControl}>
          <InputLabel id="idselectFrecuencia">Frecuencia</InputLabel>
          <Select
            labelId="selectFrecuencia"
            name="frecuencia_equ"
            id="idselectFrecuencia"
            fullWidth 
            onChange={handleChange}
          >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarFrecuencias.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_fre }>{itemselect.nombre_fre}</MenuItem>
              )
            })
          }
          </Select>
        </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_equ"
              id="idselectEstado"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarEstados.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarPropietarios.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_int }>{itemselect.razonsocial_int}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
              id="idselectMarca"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarMarcas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_mar }>{itemselect.nombre_mar}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="modelo_equ" label="Modelo del Equipo" fullWidth onChange={handleChange} /> </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="antiguedad_equ" label="Antiguedad" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoEquipo">Tipo Equipos</InputLabel>
            <Select
              labelId="selectTipoEquipo"
              name="tipoequipo_equ"
              id="idselectTipoEquipo"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarTiposEquipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tequ }>{itemselect.nombre_tequ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="serie_equ" label="Serie" onChange={handleChange} fullWidth /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="fechacreacion_equ" label="Fecha de Creación" fullWidth onChange={handleChange} /> </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fechamodificacion_equ" label="Fecha Modificación" onChange={handleChange} fullWidth /> </Grid>
        <Grid item xs={12} md={6}> <TextField  name="direccion_equ" label="Dirección" fullWidth onChange={handleChange} /> </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="valoradquisicion" label="Valor de compra" fullWidth onChange={handleChange} /> </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectMoneda">Moneda</InputLabel>
            <Select
              labelId="selectMoneda"
              name="tipomoneda_equ"
              id="idselectMoneda"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarMonedas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_mon }>{itemselect.nombre_mon}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}> 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectClasificacionabc">Clasificacion ABC</InputLabel>
            <Select
              labelId="selectClasificacionabc"
              name="clasificacionABC_equ"
              id="idselectClasificacionabc"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarClasificacionabc.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_abc }>{itemselect.nombre_abc}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCencosto">Centro de Costo</InputLabel>
            <Select
              labelId="selectCencosto"
              name="centrodecosto_equ"
              id="idselectCencosto"
              fullWidth 
              onChange={handleChange}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCencostos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_cco }>{itemselect.nombre_cco}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fechainiciagarantia_equ" label="Fecha Inicia Garantía" onChange={handleChange} fullWidth /> </Grid>    
        <Grid item xs={12} md={6}> <TextField  name="fechafingarantia_equ" label="Fecha Fin Garantía" onChange={handleChange} fullWidth /> </Grid>
      </Grid>
          
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarEquipo() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
  
    </div>
  )

  const equipoEditar=(
    <div className={styles.modal}>
     
      <h3>Actualizar Equipos</h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="codigo_equ" label="Codigo Equipo" defaultValue="1" disabled="true"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.codigo_equ} /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa" >Empresa</InputLabel>
              <Select
                labelId="selecEmpresa"
                name="empresa_equ"
                id="idselectEmpresa"
                fullWidth 
                onChange={handleChange}
                onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.empresa_equ}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="nombre_equ" label="Descripción del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.nombre_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="grupo_equ" label="Código Grupo" 
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.grupo_equ} /> 
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="subgrupo_equ" label="Código SubGrupo" 
          fullWidth onChange={handleChange}  value={equiposSeleccionado&&equiposSeleccionado.subgrupo_equ} />
        </Grid>
        <Grid item xs={12} md={6}> 
        <FormControl className={styles.formControl}>
          <InputLabel id="idselectFrecuencia">Frecuencia</InputLabel>
          <Select
            labelId="selectFrecuencia"
            name="frecuencia_equ"
            id="idselectFrecuencia"
            fullWidth 
            onChange={handleChange}
            value={equiposSeleccionado&&equiposSeleccionado.frecuencia_equ}
          >
          <MenuItem value=""> <em>None</em> </MenuItem>
          {
            listarFrecuencias.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_fre }>{itemselect.nombre_fre}</MenuItem>
              )
            })
          }
          </Select>
        </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_equ"
              id="idselectEstado"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.estado_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarEstados.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_est }>{itemselect.nombre_est}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectPropietario">Propietario</InputLabel>
            <Select
              labelId="selectPropietario"
              name="propietario_equ"
              id="idselectPropietario"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.propietario_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarPropietarios.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_int }>{itemselect.razonsocial_int}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectMarca">Marca</InputLabel>
            <Select
              labelId="selectMarca"
              name="marca_equ"
              id="idselectMarca"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.marca_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarMarcas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_mar }>{itemselect.nombre_mar}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="modelo_equ" label="Modelo del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.modelo_equ} />
        </Grid>
      </Grid>
      
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="antiguedad_equ" label="Antiguedad"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.antiguedad_equ} /> 
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoEquipo">Tipo de Equipo</InputLabel>
            <Select
              labelId="selectTipoEquipo"
              name="tipoequipo_equ"
              id="idselectTipoEquipo"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.tipoequipo_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarTiposEquipos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_tequ }>{itemselect.nombre_tequ}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="serie_equ" label="Serie" 
          onChange={handleChange} fullWidth value={equiposSeleccionado&&equiposSeleccionado.serie_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="fechacreacion_equ" label="Fecha de Creación" 
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.fechacreacion_equ} /> 
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fechamodificacion_equ" label="Fecha Modificación" 
          onChange={handleChange} fullWidth value={equiposSeleccionado&&equiposSeleccionado.fechamodificacion_equ} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="direccion_equ" label="Dirección"
           fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.direccion_equ} />
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="valoradquisicion" label="Valor de compra"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.valoradquisicion} /> 
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectMoneda">Moneda</InputLabel>
            <Select
              labelId="selectMoneda"
              name="tipomoneda_equ"
              id="idselectMoneda"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.tipomoneda_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarMonedas.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_mon }>{itemselect.nombre_mon}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}> 
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectClasificacionabc">Clasificacion ABC</InputLabel>
            <Select
              labelId="selectClasificacionabc"
              name="clasificacionABC_equ"
              id="idselectClasificacionabc"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.clasificacionABC_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarClasificacionabc.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_abc }>{itemselect.nombre_abc}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}> 
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCencosto">Centro de Costo</InputLabel>
            <Select
              labelId="selectCencosto"
              name="centrodecosto_equ"
              id="idselectCencosto"
              fullWidth 
              onChange={handleChange}
              value={equiposSeleccionado&&equiposSeleccionado.centrodecosto_equ}
            >
            <MenuItem value=""> <em>None</em> </MenuItem>
            {
              listarCencostos.map((itemselect) => {
                return (
                  <MenuItem value={itemselect.id_cco }>{itemselect.nombre_cco}</MenuItem>
                )
              })
            }
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="fechainiciagarantia_equ" label="Fecha Inicia Garantía"
          onChange={handleChange} fullWidth value={equiposSeleccionado&&equiposSeleccionado.fechainiciagarantia_equ} /> 
        </Grid>    
        <Grid item xs={12} md={6}> <TextField  name="fechafingarantia_equ" label="Fecha Fin Garantía" 
          onChange={handleChange} fullWidth value={equiposSeleccionado&&equiposSeleccionado.fechafingarantia_equ} /> 
        </Grid>
      </Grid>

      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarEquipo()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
      <DatosEquipos equipoID={equiposSeleccionado.id_equ} />
    </div>
  )

  const equipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Equipo <b>{equiposSeleccionado && equiposSeleccionado.nombre_equ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarEquipo() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Insertar</Button>
      <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title="Maestra de Equipos"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Equipo',
            onClick  : (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Equipo',
            onClick  : (event, rowData) =>   seleccionarEquipo(rowData, "Eliminar")
          } 
        ]}
        options={{
         actionsColumnIndex: 12
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {equipoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      > 
        {equipoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}   
      >
        {equipoEliminar}
      </Modal>
     
    </div>


  );
}

export default Equipos;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/