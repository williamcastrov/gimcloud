import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

// Componentes de Conexion con el Backend
import estadosServices from "../../../services/Estados";
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

function Estados() {
  const styles = useStyles();
  const [listEstados, setListEstados] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({
    id_est: "",
    codigo_est: "",
    nombre_est: "",
    empresa_est: ""
  })

  useEffect (() => {
      async function fetchDataEstados() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data) 
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const {name, value} = e.target;

    setEstadoSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEstado = (estado, caso)=>{
    setEstadoSeleccionado(estado);
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

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListEstados(res.data);
    }
    fetchDataEstados();
  }, [])

  const grabarEstado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.codigo_est) {
      errors.codigo_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.nombre_est) {
      errors.nombre_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_est) {
      errors.empresa_est = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(estadoSeleccionado);
      const res = await estadosServices.save(estadoSeleccionado);

      if (res.success) {
        alert("Estado Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete estadoSeleccionado.codigo_est;
        delete estadoSeleccionado.nombre_est;
        delete estadoSeleccionado.empresa_est;
      } else
      {
        alert("Error Creando el Estado");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Estado");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarEstado = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.codigo_est) {
      errors.codigo_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.nombre_est) {
      errors.nombre_est = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_est) {
      errors.empresa_est = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await estadosServices.update(estadoSeleccionado);

    if (res.success) {
        alert("Estado actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete estadoSeleccionado.codigo_est;
        delete estadoSeleccionado.nombre_est;
        delete estadoSeleccionado.empresa_est;
    } else
    {
        alert("Error Actualizando el Estado");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Estado");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarEstado = async()=>{
   
    const res = await estadosServices.delete(estadoSeleccionado.id_est);

    if (res.success) {
        alert("Estado Borrada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando Estado");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_est',
      type: 'numeric'
    },
    {
      title: 'Codigo',
      field: 'codigo_est'
    },
    {
      title: 'Descripción',
      field: 'nombre_est'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_est'
    },
    {
      title: 'Nombre Empresa',
      field: 'empresa.nombre_emp'
    }
  ]

  const estadoInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Estado</h3>
      <TextField className={styles.inputMaterial} label="Código" name="codigo_est" onChange={handleChange} />
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_est" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Empresa </InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_est"
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
      <br /><br />
      <div align="right">    
        <Button color="primary" onClick = { () => grabarEstado() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const estadoEditar=(
    <div className={styles.modal}>
      <br />
      <TextField className={styles.inputMaterial} label="Código" name="codigo_est" onChange={handleChange} value={estadoSeleccionado&&estadoSeleccionado.codigo_est}/>
      <br />
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_est" onChange={handleChange} value={estadoSeleccionado&&estadoSeleccionado.nombre_est}/>
      <br />
      <FormControl className={styles.formControl} value={estadoSeleccionado&&estadoSeleccionado.empresa_est} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_est"
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
      <br /><br />
      <div align="right">
        <Button color="primary"  onClick={()=>actualizarEstado()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const estadoEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Estado <b>{estadoSeleccionado && estadoSeleccionado.nombre_est}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarEstado() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <Button onClick={()=> abrirCerrarModalInsertar() } >Insertar Estado</Button>
     <MaterialTable
       columns={columnas}
       data={listEstados}
       title="Maestra de Estados"
       actions={[
         {
           icon     : 'edit',
           tooltip  : 'Editar Estado',
           onClick  : (event, rowData) => seleccionarEstado(rowData, "Editar")
         },
         {
          icon     : 'delete',
          tooltip  : 'Borrar Estado',
          onClick  : (event, rowData) =>   seleccionarEstado(rowData, "Eliminar")
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
      {estadoInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {estadoEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {estadoEliminar}
    </Modal>
    </div>
  );
}

export default Estados;