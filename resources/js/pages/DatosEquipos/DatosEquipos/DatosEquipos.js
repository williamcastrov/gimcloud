import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MaterialTable from "material-table";
import {Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

// Componentes de Conexion con el Backend
import clasificacionabcServices from "../../../services/Mantenimiento/ClasificacionABC";
import cencostosServices from "../../../services/Activos/Cencostos";
import monedasServices from "../../../services/Parameters/Monedas";
import datosequiposServices from "../../../services/DatosEquipos/DatosEquipos";

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

function DatosEquipos(props) {
  const { equipoID, equipoCodigo } = props;
  //console.log("Codigo y ID de Equipo : ", equipoID);
  //console.log("Codigo y ID de Equipo : ", equipoCodigo);

  const styles = useStyles();
  const [listarDatosEquipos, setListarDatosEquipos] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);

  const [listarClasificacionabc, setListarClasificacionabc] = useState([]);
  const [listarCencostos, setListarCencostos] = useState([]);
  const [listarMonedas, setListarMonedas] = useState([]);
  
  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
    'id_dequ': equipoID,
    'serie_dequ': "",
    'referencia_dequ': "",
    'modelo_dequ': "",
    'annofabricacion_dequ': "",
    'clasificacionABC_dequ': "",
    'centrodecosto_dequ': "",
    'tipomoneda_dequ': "",
    'direccion_dequ': "",
    'fechacreacion_dequ': "",
    'fechamodificacion_dequ': ""
  })

  useEffect(() => {
    async function fetchDataDatosEquipos() {
      const res = await datosequiposServices.listUnDatoEquipo(equipoID);
      console.log("Datos Retornados : ",res.data)
      setListarDatosEquipos(res.data);
      
    }
    fetchDataDatosEquipos();
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
    async function fetchDataMonedas() {
    const res = await monedasServices.listMonedas();
    setListarMonedas(res.data) 
    //console.log(res.data);
  }
  fetchDataMonedas();
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

  const grabarDatosEquipo = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.serie_dequ) {
      errors.serie_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.referencia_dequ) {
      errors.referencia_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.modelo_dequ) {
      errors.modelo_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.annofabricacion_dequ) {
      errors.annofabricacion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.clasificacionABC_dequ) {
      errors.clasificacionABC_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.centrodecosto_dequ) {
      errors.centrodecosto_dequ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.tipomoneda_dequ) {
      errors.tipomoneda_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.direccion_dequ) {
      errors.direccion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechacreacion_dequ) {
      errors.fechacreacion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechamodificacion_dequ) {
      errors.fechamodificacion_dequ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(equiposSeleccionado);
      const res = await datosequiposServices.save(equiposSeleccionado);

      if (res.success) {
        alert("Datos Adicionales del Equipo Creado de forma Correcta")
        //console.log(res.message)
        abrirCerrarModalInsertar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.serie_dequ;
        delete equiposSeleccionado.referencia_dequ;
        delete equiposSeleccionado.modelo_dequ;
        delete equiposSeleccionado.annofabricacion_dequ;
        delete equiposSeleccionado.clasificacionABC_dequ;
        delete equiposSeleccionado.centrodecosto_dequ;
        delete equiposSeleccionado.tipomoneda_dequ;
        delete equiposSeleccionado.direccion_dequ;
        delete equiposSeleccionado.fechacreacion_dequ;
        delete equiposSeleccionado.fechamodificacion_dequ;
      } else
      {
        alert("Error Creando Datos Adicionales del Equipo");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando Datos Adicionales del Equipo");
      console.log(equiposSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarDatosEquipo = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!equiposSeleccionado.serie_dequ) {
      errors.serie_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.referencia_dequ) {
      errors.referencia_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.modelo_dequ) {
      errors.modelo_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.annofabricacion_dequ) {
      errors.annofabricacion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.clasificacionABC_dequ) {
      errors.clasificacionABC_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.centrodecosto_dequ) {
      errors.centrodecosto_dequ = true;
      formOk = false;
    }
    
    if (!equiposSeleccionado.tipomoneda_dequ) {
      errors.tipomoneda_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.direccion_dequ) {
      errors.direccion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechacreacion_dequ) {
      errors.fechacreacion_dequ = true;
      formOk = false;
    }

    if (!equiposSeleccionado.fechamodificacion_dequ) {
      errors.fechamodificacion_dequ = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    console.log(equiposSeleccionado.id_dequ);
    const res = await datosequiposServices.update(equiposSeleccionado);

    if (res.success) {
        alert("Datos Adicionales del Equipos actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete equiposSeleccionado.codigo_equ;
        delete equiposSeleccionado.serie_dequ;
        delete equiposSeleccionado.referencia_dequ;
        delete equiposSeleccionado.modelo_dequ;
        delete equiposSeleccionado.annofabricacion_dequ;
        delete equiposSeleccionado.clasificacionABC_dequ;
        delete equiposSeleccionado.centrodecosto_dequ;
        delete equiposSeleccionado.tipomoneda_dequ;
        delete equiposSeleccionado.direccion_dequ;
        delete equiposSeleccionado.fechacreacion_dequ;
        delete equiposSeleccionado.fechamodificacion_dequ;
    } else
    {
        alert("Error Actualizando Datos Adicionales del Equipo");
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

  const borrarDatosEquipo = async()=>{
   
    const res = await datosequiposServices.delete(equiposSeleccionado.id_dequ);

    if (res.success) {
        alert("Datos Adicionales del Equipo Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando Datos Adicionales del Equipo");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
  {
    field: 'serie_dequ',
    title: 'Serie',
    cellStyle: { minWidth: 170 }
  },
  {
    field: 'referencia_dequ',
    title: 'Referencia',
    cellStyle: { minWidth: 170 }
  },
  {
    field: 'modelo_dequ',
    title: 'Modelo',
    cellStyle: { minWidth: 130 }
  },
  {
    field: 'annofabricacion_dequ',
    title: 'Año de Fabricación',
    cellStyle: { minWidth: 90 }
  },
  {
    field: 'descripcion_abc',
    title: 'Clasificación ABC'
  },
  {
    field: 'descripcion_cco',
    title: 'Centro de Costo',
    cellStyle: { minWidth: 120 }
  },
  {
    field: 'descripcion_mon',
    title: 'Moneda'
  },
  {
    field: 'direccion_dequ',
    title: 'Dirección',
    cellStyle: { minWidth: 210 }
  },
  {
    field: 'fechacreacion_dequ',
    title: 'Fecha de Creación',
    type: 'date',
    cellStyle: { minWidth: 80 }

  },
  {
    field: 'fechamodificacion_dequ',
    title: 'Fecha de Modificación',
    type: 'date',
    cellStyle: { minWidth: 80 }
  }
  ]
  
  const datosequipoInsertar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Datos Adicionales del Equipo { } {equipoCodigo} </h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="id_dequ" label="ID del Equipo" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="serie_dequ" label="Serie del Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="referencia_dequ" label="Referencia del Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="modelo_dequ" label="Modelo del Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="annofabricacion_dequ" label="Año de Fabricación del Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectclasificacionABC_dequ" >Clasificacion ABC del Equipo</InputLabel>
              <Select
                labelId="selectclasificacionABC_dequ"
                name="clasificacionABC_dequ"
                id="idselectclasificacionABC_dequ"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClasificacionabc.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_abc }>{itemselect.descripcion_abc}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcentrodecosto_dequ" >Centro de Costo del Equipo</InputLabel>
              <Select
                labelId="selectcentrodecosto_dequ"
                name="centrodecosto_dequ"
                id="idselectcentrodecosto_dequ"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCencostos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cco }>{itemselect.descripcion_cco}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipomoneda_dequ" >Tipo Moneda de Equipo</InputLabel>
              <Select
                labelId="selecttipomoneda_dequ"
                name="tipomoneda_dequ"
                id="idselecttipomoneda_dequ"
                fullWidth 
                onChange={handleChange}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMonedas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mon }>{itemselect.descripcion_mon}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}> <TextField  name="direccion_dequ" label="Dirección donde esta Ubicado el Equipo"
          fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true}} name="fechacreacion_dequ"
              label="Fecha de Creación del Equipo" fullWidth onChange={handleChange} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField type="date" InputLabelProps={{ shrink: true}} name="fechamodificacion_dequ" 
              label="Fecha de Creación del Equipo" fullWidth onChange={handleChange} /> 
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarDatosEquipo() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
  
    </div>
  )

  const datosequipoEditar=(
    <div className={styles.modal}>

      <h3 align="center" >Actualizar Datos Adicionales del Equipo { } {equipoCodigo} </h3>
      <Grid container spacing={2} > 
        <Grid item xs={12} md={6}> <TextField  name="id_dequ" label="ID del Equipo" defaultValue={equipoID} disabled="true"
          fullWidth onChange={handleChange} /> 
        </Grid> 
        <Grid item xs={12} md={6}> <TextField  name="serie_dequ" label="Serie del Equipo"
          fullWidth onChange={handleChange}  value={equiposSeleccionado&&equiposSeleccionado.serie_dequ} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="referencia_dequ" label="Referencia del Equipo"
          fullWidth onChange={handleChange}  value={equiposSeleccionado&&equiposSeleccionado.referencia_dequ} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="modelo_dequ" label="Modelo del Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.modelo_dequ} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="annofabricacion_dequ" label="Año de Fabricación del Equipo"
          fullWidth onChange={handleChange}  value={equiposSeleccionado&&equiposSeleccionado.annofabricacion_dequ}  /> 
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectclasificacionABC_dequ" >Clasificacion ABC del Equipo</InputLabel>
              <Select
                labelId="selectclasificacionABC_dequ"
                name="clasificacionABC_dequ"
                id="idselectclasificacionABC_dequ"
                fullWidth 
                onChange={handleChange}
                value={equiposSeleccionado&&equiposSeleccionado.clasificacionABC_dequ}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarClasificacionabc.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_abc }>{itemselect.descripcion_abc}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectcentrodecosto_dequ" >Centro de Costo del Equipo</InputLabel>
              <Select
                labelId="selectcentrodecosto_dequ"
                name="centrodecosto_dequ"
                id="idselectcentrodecosto_dequ"
                fullWidth 
                onChange={handleChange}
                value={equiposSeleccionado&&equiposSeleccionado.centrodecosto_dequ}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCencostos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cco }>{itemselect.descripcion_cco}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselecttipomoneda_dequ" >Tipo Moneda de Equipo</InputLabel>
              <Select
                labelId="selecttipomoneda_dequ"
                name="tipomoneda_dequ"
                id="idselecttipomoneda_dequ"
                fullWidth 
                onChange={handleChange}
                value={equiposSeleccionado&&equiposSeleccionado.tipomoneda_dequ}
              >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarMonedas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_mon }>{itemselect.descripcion_mon}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}> <TextField  name="direccion_dequ" label="Dirección donde esta Ubicado el Equipo"
          fullWidth onChange={handleChange} value={equiposSeleccionado&&equiposSeleccionado.direccion_dequ} /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="fechacreacion_dequ" label="Fecha de Creación del Equipo"
          fullWidth onChange={handleChange}  value={equiposSeleccionado&&equiposSeleccionado.fechacreacion_dequ } /> 
        </Grid>
        <Grid item xs={12} md={6}> <TextField  name="fechamodificacion_dequ" label="Fecha de Creación del Equipo"
          fullWidth onChange={handleChange}   value={equiposSeleccionado&&equiposSeleccionado.fechamodificacion_dequ } /> 
        </Grid>
      </Grid>
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarDatosEquipo()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const datosequipoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Equipo <b>{equiposSeleccionado && equiposSeleccionado.referencia_dequ}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarDatosEquipo() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Datos Adicionales del Equipo</Button>
      <MaterialTable
        columns={columnas}
        data={listarDatosEquipos}
        title="Datos Adicionales de los Equipos"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Datos Adicionales de los Equipos',
            onClick  : (event, rowData) => seleccionarEquipo(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar Datos Adicionales de los Equipos',
            onClick  : (event, rowData) =>   seleccionarEquipo(rowData, "Eliminar")
          } 
        ]}
        options={{
         actionsColumnIndex: 10
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
        {datosequipoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      > 
        {datosequipoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}   
      >
        {datosequipoEliminar}
      </Modal>
     
    </div>


  );
}

export default DatosEquipos;

/*
  <Fab variant="extended">
        <NavigationIcon className={styles.extendedIcon} />
        Datos Adicionales Equipos
        onClick
      </Fab>
*/