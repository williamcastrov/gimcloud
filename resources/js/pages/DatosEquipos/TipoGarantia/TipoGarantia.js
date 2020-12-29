import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import {Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tipogarantiaServices from "../../../services/DatosEquipos/TipoGarantia"
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

function TipoGarantia() {
  const styles = useStyles();
  const [listarTipoGarantia, setListarTipoGarantia] = useState([]);
  const [modalInsertar, setModalInsertar ] = useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [tipogarantiaSeleccionado, setTipoGarantiaSeleccionado ] = useState({
    'id_tga'         : "",
    'descripcion_tga': "",
    'empresa_tga'    : "",
    'estado_tga'     : "",
  })

  useEffect (() => {
      async function fetchDataTipoGarantia() {
      const res = await tipogarantiaServices.listTipogarantia();
      setListarTipoGarantia(res.data) 
      console.log(res.data);
    }
    fetchDataTipoGarantia();
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

    setTipoGarantiaSeleccionado( prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTipoGarantia=(tipogarantia, caso)=>{
    setTipoGarantiaSeleccionado(tipogarantia);
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

  const grabarTipoGarantia = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tipogarantiaSeleccionado.descripcion_tga) {
      errors.descripcion_tga = true;
      formOk = false;
    }
    
    if (!tipogarantiaSeleccionado.empresa_tga) {
      errors.empresa_tga = true;
      formOk = false;
    }

    if (!tipogarantiaSeleccionado.estado_tga) {
      errors.estado_tga = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      //console.log(tipogarantiaSeleccionado);
      const res = await tipogarantiaServices.save(tipogarantiaSeleccionado);

      if (res.success) {
        alert("Tipo de Garantia Creado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tipogarantiaSeleccionado.descripcion_tga;
        delete tipogarantiaSeleccionado.empresa_tga;
        delete tipogarantiaSeleccionado.estado_tga;
      } else
      {
        alert("Error Creando el Tipo de Garantia");
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Creando el Tipo de garantia");
      //console.log(tipogarantiaSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  const actualizarTipoGarantia = async () => {
  
    setFormError({});
    let errors = {};
    let formOk = true;
    
    if (!tipogarantiaSeleccionado.descripcion_tga) {
      errors.descripcion_tga = true;
      formOk = false;
    }
    
    if (!tipogarantiaSeleccionado.empresa_tga) {
      errors.empresa_tga = true;
      formOk = false;
    }

    if (!tipogarantiaSeleccionado.estado_tga) {
      errors.estado_tga = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
    
    const res = await tipogarantiaServices.update(tipogarantiaSeleccionado);

    if (res.success) {
        alert("Tipo de Garantia actualizada de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tipogarantiaSeleccionado.descripcion_tga;
        delete tipogarantiaSeleccionado.empresa_tga;
        delete tipogarantiaSeleccionado.estado_tga;
    } else
    {
        alert("Error Actualizando el Tipo de Garantia");
        console.log(res.message);
        abrirCerrarModalEditar();
    }
    }
    else {
      alert("Debe Ingresar Todos los Datos, Error Actualizando el Tipo de Garantia");
      console.log(res.message);
      abrirCerrarModalEditar();
    } 
  }

  const borrarTipoGarantia = async()=>{
   
    const res = await tipogarantiaServices.delete(tipogarantiaSeleccionado.id_tga);

    if (res.success) {
        alert("El Tipo de Garantia Borrado de forma Correcta")
        console.log(res.message)
        abrirCerrarModalEliminar();
    }
    else {
        alert("Error Borrando el Tipo de Garantia");
        console.log(res.message);
        abrirCerrarModalEliminar();
    }
    
  }
 // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tga'
    },
    {
      title: 'Descripción',
      field: 'descripcion_tga',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Codigo Empresa',
      field: 'empresa_tga'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const tipogarantiaInsertar = (
    <div className={styles.modal}>
      <h3 align="center" >Agregar Nuevo Tipo de Garantia</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tga" onChange={handleChange} />          
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tga"
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
          name="empresa_tga"
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
        <Button color="primary" onClick = { () => grabarTipoGarantia() } >Insertar</Button>
        <Button onClick={()=> abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipogarantiaEditar=(
    <div className={styles.modal}>
      <h3 align="center" >Actualizar Tipo de Garantia</h3>
      <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tga" onChange={handleChange} value={tipogarantiaSeleccionado&&tipogarantiaSeleccionado.descripcion_tga}/>
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstado">Estado</InputLabel>
        <Select
          labelId="selectEstado"
          name="estado_tga"
          id="idselectEstado"
          onChange={handleChange}
          value={tipogarantiaSeleccionado&&tipogarantiaSeleccionado.estado_tga}
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
          name="empresa_tga"
          id="idselectEmpresa"
          onChange={handleChange}
          value={tipogarantiaSeleccionado&&tipogarantiaSeleccionado.empresa_tga}
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
        <Button color="primary"  onClick={()=>actualizarTipoGarantia()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipogarantiaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Garantia <b>{tipogarantiaSeleccionado && tipogarantiaSeleccionado.descripcion_tga}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick = {() => borrarTipoGarantia() }> Confirmar </Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={()=> abrirCerrarModalInsertar() } >Agregar Tipo de Garantia</Button>
      <MaterialTable
        columns={columnas}
        data={listarTipoGarantia}
        title="Maestra de Tipos de Garantias"
        actions={[
          {
            icon     : 'edit',
            tooltip  : 'Editar Tipo de Garantia',
            onClick  : (event, rowData) => seleccionarTipoGarantia(rowData, "Editar")
          },
          {
            icon     : 'delete',
            tooltip  : 'Borrar tipo de Garantia',
            onClick  : (event, rowData) =>   seleccionarTipoGarantia(rowData, "Eliminar")
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
      {tipogarantiaInsertar}
    </Modal>

    <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
    >
      {tipogarantiaEditar}
    </Modal>

    <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}
    >
      {tipogarantiaEliminar}
    </Modal>
    </div>
  );
}

export default TipoGarantia;