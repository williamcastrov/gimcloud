import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tiposllantasServices from "../../../services/DatosEquipos/TiposLlantas"
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Empresa";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 315,
  }
}));

function TiposLlantas() {
  const styles = useStyles();
  const [listarTiposLlantas, setListarTiposLlantas] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [tiposllantasSeleccionado, setTiposLlantasSeleccionado ] = useState({
    'id_llan'         : "",
    'descripcion_llan': "",
    'observacion_llan': "",
    'empresa_llan'    : "",
    'estado_llan'     : "",
  })

  useEffect (() => {
      async function fetchDataTiposLlantas() {
      const res = await tiposllantasServices.listTiposLlantas();
      setListarTiposLlantas(res.data) 
      console.log(res.data);
    }
    fetchDataTiposLlantas();
  }, [])

  useEffect (() => {
    async function fetchDataEstados() {
    const res = await estadosServices.listEstados();
    setListarEstados(res.data) 
    //console.log(res.data);
  }
  fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setTiposLlantasSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposLlantas=(especialidad, caso)=>{
    setTiposLlantasSeleccionado(especialidad);
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

  const grabarTipoLlanta = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposllantasSeleccionado.descripcion_llan) {
      errors.descripcion_llan = true;
      formOk = false;
    }
    
    if (!tiposllantasSeleccionado.observacion_llan) {
      errors.observacion_llan = true;
      formOk = false;
    }

    if (!tiposllantasSeleccionado.empresa_llan) {
      errors.empresa_llan = true;
      formOk = false;
    }

    if (!tiposllantasSeleccionado.estado_llan) {
      errors.estado_llan = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(tiposllantasSeleccionado);
      const res = await tiposllantasServices.save(tiposllantasSeleccionado);

      if (res.success) {
        alert("Tipo de Llantas Creada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposllantasSeleccionado.descripcion_llan;
        delete tiposllantasSeleccionado.observacion_llan;
        delete tiposllantasSeleccionado.empresa_llan;
        delete tiposllantasSeleccionado.estado_llan;
      } else
      {
        alert("Error Creando el Tipo de Llanta");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Tipo de Llanta");
      //console.log(tiposllantasSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipoLlanta = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;
    
    if (!tiposllantasSeleccionado.descripcion_llan) {
      errors.descripcion_llan = true;
      formOk = false;
    }
    
    if (!tiposllantasSeleccionado.observacion_llan) {
      errors.observacion_llan = true;
      formOk = false;
    }

    if (!tiposllantasSeleccionado.empresa_llan) {
      errors.empresa_llan = true;
      formOk = false;
    }

    if (!tiposllantasSeleccionado.estado_llan) {
      errors.estado_llan = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
    
    const res = await tiposllantasServices.update(tiposllantasSeleccionado);

    if (res.success) {
        alert("Tipos de Llantas actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposllantasSeleccionado.descripcion_llan;
        delete tiposllantasSeleccionado.observacion_llan;
        delete tiposllantasSeleccionado.empresa_llan;
        delete tiposllantasSeleccionado.estado_llan;
    } else
    {
        alert("Error Actualizando el Tipo de Llanta");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Llanta");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarTipoLlanta = async()=>{
   
    const res = await tiposllantasServices.delete(tiposllantasSeleccionado.id_llan);

    if (res.success) {
        alert("El Tipo de Llanta Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Tipo de Llanta");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_llan'
    },
    {
      title: 'Descripción',
      field: 'descripcion_llan',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_llan'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Observación',
      field: 'observacion_llan',
      cellStyle: { minWidth: 600 }
    }
  ]

  const tiposllantasInsertar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Nuevo Tipo de Llanta</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_llan" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_llan"
          id="idselectEstado"
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
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_llan"
          id="idselectEmpresa"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_llan" onChange={handleChange} />
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarTipoLlanta() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiposllantasEditar=(
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Especialidades</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_llan" onChange={handleChange} value={tiposllantasSeleccionado&&tiposllantasSeleccionado.descripcion_llan}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_llan"
          id="idselectEstado"
          onChange={handleChange}
          value={tiposllantasSeleccionado&&tiposllantasSeleccionado.estado_llan}
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
      <br />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_llan"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tiposllantasSeleccionado&&tiposllantasSeleccionado.empresa_llan}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarEmpresas.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_emp }>{itemselect.nombre_emp}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Observación" name="observacion_llan" 
      onChange={handleChange}value={tiposllantasSeleccionado&&tiposllantasSeleccionado.observacion_llan} />
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarTipoLlanta()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiposllantasEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Llanta <b>{tiposllantasSeleccionado && tiposllantasSeleccionado.descripcion_llan}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarTipoLlanta() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Tipo de Llanta</Button>
      <MaterialTable
        columns={columnas}
        data={listarTiposLlantas}
        title="Maestra de Tipos de Llantas"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Tipo de Llanta',
            onClick  : (event, rowData) => seleccionarTiposLlantas(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar tipo de Llanta',
            onClick  : (event, rowData) =>   seleccionarTiposLlantas(rowData, "Eliminar")
          } 
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
        />{}
    <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
    >
      {tiposllantasInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tiposllantasEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tiposllantasEliminar}
    </Modal>
    </div>
  );
}

export default TiposLlantas;