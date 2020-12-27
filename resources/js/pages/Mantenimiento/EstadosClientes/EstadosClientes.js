import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import estadosclientesServices from "../../../services/Mantenimiento/EstadosClientes";
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

function EstadosClientes() {
  const styles = useStyles();
  const [listEstados, setListEstados] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState({
    id_est: "",
    nombre_est: "",
    empresa_est: ""
  })

  useEffect (() => {
      async function fetchDataEstados() {
      const res = await estadosclientesServices.listEstadosClientes();
      setListEstados(res.data) 
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
  
  const grabarEstado = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.nombre_estcli) {
      errors.nombre_estcli = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_estcli) {
      errors.empresa_estcli = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(estadoSeleccionado);
      const res = await estadosclientesServices.save(estadoSeleccionado);

      if (res.success) {
        alert("Estado Cliente Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete estadoSeleccionado.nombre_estcli;
        delete estadoSeleccionado.empresa_estcli;
      } else
      {
        alert("Error Creando el Estado del Cliente");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Estado del Cliente");
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarEstado = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!estadoSeleccionado.nombre_estcli) {
      errors.nombre_estcli = true;
      formOk = false;
    }

    if (!estadoSeleccionado.empresa_estcli) {
      errors.empresa_estcli = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await estadosclientesServices.update(estadoSeleccionado);

    if (res.success) {
        alert("Estado del Cliente actualizado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete estadoSeleccionado.nombre_est;
        delete estadoSeleccionado.empresa_est;
    } else
    {
        alert("Error Actualizando el Estado del Cliente");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Estado del Cliente");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarEstado = async()=>{
   
    const res = await estadosclientesServices.delete(estadoSeleccionado.id_estcli);

    if (res.success) {
        alert("Estado del Cliente Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando Estado del Cliente");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_estcli'
    },
    {
      title: 'Descripción',
      field: 'nombre_estcli'
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_estcli'
    },
    {
      title: 'Nombre Empresa',
      field: 'empresa.nombre_emp'
    }
  ]

  const estadoInsertar = (
    <div className={styles.modal}>
      <h3  align="center" >Agregar Nuevo Estado del Cliente</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_estcli" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Empresa </InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_estcli"
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
      <h3 align="center" >Actualizar Estados del Cliente</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="nombre_estcli" onChange={handleChange} value={estadoSeleccionado&&estadoSeleccionado.nombre_estcli}/>
      <br />
      <FormControl className={styles.formControl} >
        <InputLabel id="idselectEmpresa">Empresa</InputLabel>
        <Select
          labelId="selectEmpresa"
          name="empresa_estcli"
          id="idselectEmpresa"
          onChange={handleChange}
          value={estadoSeleccionado&&estadoSeleccionado.empresa_estcli}
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
      <p>Estás seguro que deseas eliminar el Estado del Cliente <b>{estadoSeleccionado && estadoSeleccionado.nombre_estcli}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarEstado() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
    <br />
    <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Estado</Button>
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

export default EstadosClientes;